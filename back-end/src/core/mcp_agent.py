from dotenv import load_dotenv
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import HumanMessage
from .prompt.mcp_agent_prompt import SYSTEM_PROMPT
from .llm import create_chat_model
import os
import logging
import json
import base64

logger = logging.getLogger(__name__)

load_dotenv(override=True)

# 환경변수에서 SMITHERY_API_KEY 가져오기
SMITHERY_API_KEY = os.getenv("SMITHERY_API_KEY")

def create_mcp_config():
    params = {
    # "githubPersonalAccessToken": "액세스 토큰"
    }
    config_b64 = base64.b64encode(json.dumps(params).encode())

    # config는 둘중하나로 해야함 (git참고)
    mcp_config = {
        "duckduckgo-mcp-server": {
            "url": f"https://server.smithery.ai/@nickclyde/duckduckgo-mcp-server/mcp?api_key={SMITHERY_API_KEY}",
            "transport": "streamable_http"
        },
        "github-mcp-server": {
            "url": f"https://server.smithery.ai/@smithery-ai/github/mcp?config={config_b64}&api_key={SMITHERY_API_KEY}",
            "transport": "streamable_http"
        }
    }
    pass

async def create_agent(mcp_config={}):
    """
    MCP 세션과 에이전트를 초기화합니다.

    매개변수:
        mcp_config: MCP 도구 설정 정보(JSON)

    반환값:
        agent: 생성된 에이전트
    """
    client = MultiServerMCPClient(mcp_config)
    
    # 컨텍스트 매니저 없이 직접 사용
    tools = await client.get_tools()
    tool_count = len(tools)
    logger.info(f"MCP 도구 개수: {tool_count}")  # 도구 개수 출력

    chat_model = os.getenv("CHAT_MODEL")

    model = create_chat_model(chat_model, 0.1)

    # 비동기 도구를 사용하는 에이전트 생성
    agent = create_react_agent(
        model,
        tools,
        checkpointer=MemorySaver(),
        prompt=SYSTEM_PROMPT,
    )
    return agent


async def run_mcp_agent(question: str, config: dict) -> str:
    """
    MCP 에이전트를 실행합니다.

    매개변수:
        question: 질문
        config: MCP 도구 설정 정보(JSON)

    반환값:
        result: 에이전트의 응답
    """
    agent = await create_agent(config)

    config = RunnableConfig(recursion_limit=10, thread_id=1)
    result = await agent.ainvoke(
        {"messages": [HumanMessage(content=question)]},
        config=config
    )
    return result["messages"][-1].content 