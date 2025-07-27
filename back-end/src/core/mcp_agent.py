import os
import json
import base64
from dotenv import load_dotenv
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import HumanMessage
from .prompt import SYSTEM_PROMPT


load_dotenv(override=True)

params = {
  "githubPersonalAccessToken": "액세스 토큰"
}

config_b64 = base64.b64encode(json.dumps(params).encode())

smithery_api_key = "스미더리 api key"

# config는 둘중하나로 해야함 (git참고)
mcp_config = {
    "duckduckgo-mcp-server": {
        "url": f"https://server.smithery.ai/@nickclyde/duckduckgo-mcp-server/mcp?api_key={smithery_api_key}",
        "transport": "streamable_http"
    },
    "github-mcp-server": {
        "url": f"https://server.smithery.ai/@smithery-ai/github/mcp?config={config_b64}&api_key={smithery_api_key}",
        "transport": "streamable_http"
    }
}

OUTPUT_TOKEN_INFO = {
    "claude-3-5-sonnet-latest": {"max_tokens": 8192},
    "claude-3-5-haiku-latest": {"max_tokens": 8192},
    "claude-3-7-sonnet-latest": {"max_tokens": 64000},
    "gpt-4o": {"max_tokens": 16000},
    "gpt-4o-mini": {"max_tokens": 16000},
    "gemini-1.5-pro": {"max_tokens": 8192},
}

async def create_agent(mcp_config=None):
    """
    MCP 세션과 에이전트를 초기화합니다.

    매개변수:
        mcp_config: MCP 도구 설정 정보(JSON). None인 경우 기본 설정 사용

    반환값:
        agent: 생성된 에이전트
    """
    client = MultiServerMCPClient(mcp_config)
    
    # 컨텍스트 매니저 없이 직접 사용
    tools = await client.get_tools()
    tool_count = len(tools)
    # print(f"tool_count: {tool_count}")  # 도구 개수 출력

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.1,
        max_tokens=OUTPUT_TOKEN_INFO["gpt-4o"]["max_tokens"],
    )

        
    # 비동기 도구를 사용하는 에이전트 생성
    agent = create_react_agent(
        model,
        tools,
        checkpointer=MemorySaver(),
        prompt=SYSTEM_PROMPT,
    )
    return agent


async def run_mcp_agent(question: str) -> str:

    agent = await create_agent(mcp_config)

    config = RunnableConfig(recursion_limit=10, thread_id=1)
    result = await agent.ainvoke(
        {"messages": [HumanMessage(content=question)]},
        config=config
    )
    return result["messages"][-1].content 