import json
import base64
import os
from dotenv import load_dotenv
from langgraph.graph import MessagesState, StateGraph, START, END
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from .prompt.smithery_agent_prompt import EXTRACT_SEMANTIC_PROMPT, CHECK_MCP_PROMPT
from .llm import create_chat_model
from urllib.parse import quote
import requests
import logging

logger = logging.getLogger(__name__)


# .env 파일 로드
load_dotenv()

# 환경변수에서 SMITHERY_API_KEY 가져오기
SMITHERY_API_KEY = os.getenv("SMITHERY_API_KEY")

params = {
  "githubPersonalAccessToken": "액세스 토큰"
}



class State(MessagesState):
    questions: list[str]
    semantics: list[str]
    mcp_list_by_question: list[list[str]]
    configs: list[dict[str, str]]


def extract_semantic_node(state: State) -> State:
    """
    질문리스트에서 각각 의미 단어를 추출합니다.
    최대 3개의 단어를 추출합니다.
    """
    questions = state["questions"]
    semantics = []
    llm = create_chat_model(os.getenv("CHAT_MODEL"), 0.3)


    prompt = ChatPromptTemplate.from_messages(
        [("system", EXTRACT_SEMANTIC_PROMPT)]
    )

    for question in questions:
        extraction_chain = prompt | llm | StrOutputParser()
        semantics.append(extraction_chain.invoke({"question": question}))

    return {"semantics": semantics}


def search_smithery_mcp_node(state: State) -> State:
    """
    스미더리에서 mcp 를 검색합니다.
    """
    semantics = state["semantics"]

    mcp_list_by_question = []

    for semantic in semantics:
        logger.info(f"스미더리 검색: {semantic}")
        semantic_split = semantic.split("/")
        mcp_list = []
        for word in semantic_split:
            logger.info(f"스미더리 에이전트 검색: {word}")
            query = f'is:deployed {word}'
            encoded_query = quote(query)

            response = requests.get(
                f'https://registry.smithery.ai/servers?q={encoded_query}&page=1&pageSize=10',
                headers={
                    'Authorization': f'Bearer {SMITHERY_API_KEY}',
                    'Accept': 'application/json'
                }
            )

            data = response.json()
            all_servers = data["servers"]
            # remote가 true인 서버만 필터링
            remote_servers = [server for server in all_servers if server.get("remote") == True]
            
            mcp_list.extend(remote_servers)

        mcp_list_by_question.append(mcp_list)

    return {"semantics": semantics, "mcp_list_by_question": mcp_list_by_question}

def search_detail_smithery_mcp_node(state: State) -> State:
    """
    스미더리 검색한 mcp로 상세정보를 검색합니다.
    """
    questions = state["questions"]

    #2차원 배열 
    mcp_list_by_question = state["mcp_list_by_question"]

    llm = create_chat_model(os.getenv("CHAT_MODEL"), 0)

    configs = []

    for index, mcp_list in enumerate(mcp_list_by_question):
        config = {}
        for mcp in mcp_list:
            mcp_name = mcp["qualifiedName"]
            response = requests.get(
                f'https://registry.smithery.ai/servers/{mcp_name}',
                headers={
                    'Authorization': f'Bearer {SMITHERY_API_KEY}',
                    'Accept': 'application/json'
                }
            )
            data = response.json()

            prompt = ChatPromptTemplate.from_messages(
                [("system", CHECK_MCP_PROMPT)]
            )

            check_mcp_chain = prompt | llm | StrOutputParser()
            result = check_mcp_chain.invoke({"question": questions[index], "mcp_info": data})
            result_dict = json.loads(result)
            logger.info(f"MCP 적합성 판단: {result_dict}")

            # http 타입의 연결만 필터링하여 새 변수에 저장
            http_connections = []
            if "connections" in data:
                http_connections = [conn for conn in data["connections"] if conn.get("type") == "http"]

            logger.info(f"HTTP 연결: {http_connections}")

            if result_dict["check"] == "YES" and len(http_connections) > 0:
                config["connections"] = http_connections[0]
                config["qualifiedName"] = data["qualifiedName"]
                config["query"] = questions[index]
                break

        configs.append(config) 

    return {"configs": configs}



def create_smithery_agent():
    """
    스미더리 에이전트를 생성합니다.
    에이전트는 스미더리에서 mcp 를 검색하여 도구를 찾습니다.
    """

    workflow = StateGraph(State)

    # 노드 추가
    workflow.add_node("extract_semantic_node", extract_semantic_node)
    workflow.add_node("search_smithery_mcp_node", search_smithery_mcp_node)
    workflow.add_node("search_detail_smithery_mcp_node", search_detail_smithery_mcp_node)

    # 엣지 추가
    workflow.add_edge(START, "extract_semantic_node")
    workflow.add_edge("extract_semantic_node", "search_smithery_mcp_node")
    workflow.add_edge("search_smithery_mcp_node", "search_detail_smithery_mcp_node")
    workflow.add_edge("search_detail_smithery_mcp_node", END)

    #조건 엣지 추가


    return workflow.compile()


def run_smithery_agent(questions: list[str]):
    """
    스미더리 에이전트를 실행합니다.
    """
    logger.info(f"스미더리 에이전트 실행: {questions}")
    agent = create_smithery_agent()
    result = agent.invoke({"questions": questions})
    return result["configs"]


# print(run_smithery_agent(["github push", "github pull", "Make a commit with the message 'TEST: data' to my TESTPROJECT repository on GitHub."]))