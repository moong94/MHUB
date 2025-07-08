from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
import asyncio
import json
import os
from dotenv import load_dotenv
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import HumanMessage

load_dotenv(override=True)


OUTPUT_TOKEN_INFO = {
    "claude-3-5-sonnet-latest": {"max_tokens": 8192},
    "claude-3-5-haiku-latest": {"max_tokens": 8192},
    "claude-3-7-sonnet-latest": {"max_tokens": 64000},
    "gpt-4o": {"max_tokens": 16000},
    "gpt-4o-mini": {"max_tokens": 16000},
    "gemini-1.5-pro": {"max_tokens": 8192},
}

SYSTEM_PROMPT = """<ROLE>
You are a smart agent with an ability to use tools. 
You will be given a question and you will use the tools to answer the question.
Pick the most relevant tool to answer the question. 
If you are failed to answer the question, try different tools to get context.
Your answer should be very polite and professional.
</ROLE>

----

<INSTRUCTIONS>
Step 1: Analyze the question
- Analyze user's question and final goal.
- If the user's question is consist of multiple sub-questions, split them into smaller sub-questions.

Step 2: Pick the most relevant tool
- Pick the most relevant tool to answer the question.
- If you are failed to answer the question, try different tools to get context.

Step 3: Answer the question
- Answer the question in the same language as the question.
- Your answer should be very polite and professional.

Step 4: Provide the source of the answer(if applicable)
- If you've used the tool, provide the source of the answer.
- Valid sources are either a website(URL) or a document(PDF, etc).

Guidelines:
- If you've used the tool, your answer should be based on the tool's output(tool's output is more important than your own knowledge).
- If you've used the tool, and the source is valid URL, provide the source(URL) of the answer.
- Skip providing the source if the source is not URL.
- Answer in the same language as the question.
- Answer should be concise and to the point.
- Avoid response your output with any other information than the answer and the source.  
</INSTRUCTIONS>

----

<OUTPUT_FORMAT>
(concise answer to the question)

**Source**(if applicable)
- (source1: valid URL)
- (source2: valid URL)
- ...
</OUTPUT_FORMAT>
"""

# mcp_client = None

# def cleanup_mcp_client():
#     """
#     기존 MCP 클라이언트를 안전하게 종료합니다.

#     기존 클라이언트가 있는 경우 정상적으로 리소스를 해제합니다.
#     """
#     if mcp_client is not None:
#         try:
#             mcp_client.__exit__(None, None, None)
#             mcp_client = None
#         except Exception as e:
#             import traceback

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
    print(f"tool_count: {tool_count}")  # 도구 개수 출력

    model = ChatOpenAI(
        model="gpt-4o",
        temperature=0.1,
        max_tokens=OUTPUT_TOKEN_INFO["gpt-4o"]["max_tokens"],
    )

    print(tools)
        
    # 비동기 도구를 사용하는 에이전트 생성
    agent = create_react_agent(
        model,
        tools,
        checkpointer=MemorySaver(),
        prompt=SYSTEM_PROMPT,
    )
    return agent
    

mcp_test_config = {
  "mcpServers": {
    "duckduckgo-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@nickclyde/duckduckgo-mcp-server",
        "--key",
        "cd69effe-b818-49f6-9d1b-bf86de5e0a19"
      ]
    },
    "time-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@yokingma/time-mcp",
        "--key",
        "cd69effe-b818-49f6-9d1b-bf86de5e0a19"
      ]
    }
  }
}

mcp_config = {}

# mcpServers 형식인지 확인하고 처리
if "mcpServers" in mcp_test_config:
    # mcpServers 안의 내용을 최상위로 이동
    mcp_test_config = mcp_test_config["mcpServers"]
    print(
        "'mcpServers' 형식이 감지되었습니다. 자동으로 변환합니다."
    )

for tool_name, tool_config in mcp_test_config.items():
    # URL 필드 확인 및 transport 설정
    if "url" in tool_config:
        # URL이 있는 경우 transport를 "sse"로 설정
        tool_config["transport"] = "sse"
        print(
            f"'{tool_name}' 도구에 URL이 감지되어 transport를 'sse'로 설정했습니다."
        )
    elif "transport" not in tool_config:
        # URL이 없고 transport도 없는 경우 기본값 "stdio" 설정
        tool_config["transport"] = "stdio"
        print(
            f"'transport를 'stdio'로 설정했습니다."
        )

    # 필수 필드 확인
    if ("command" not in tool_config and "url" not in tool_config):
        print(f"'{tool_name}' 도구 설정에는 'command' 또는 'url' 필드가 필요합니다.")
    elif "command" in tool_config and "args" not in tool_config:
        print(f"'{tool_name}' 도구 설정에는 'args' 필드가 필요합니다.")
    elif "command" in tool_config and not isinstance(tool_config["args"], list):
        print(f"'{tool_name}' 도구의 'args' 필드는 반드시 배열([]) 형식이어야 합니다.")
    else:
        # mcp_config에 도구 추가
        mcp_config[tool_name] = (
            tool_config
        )

# 비동기 함수로 에이전트 실행
async def run_agent():
    agent = await create_agent(mcp_config)
    print("✅ 에이전트 생성 완료!")
    print(f"에이전트 타입: {type(agent)}")

    config = RunnableConfig(
        recursion_limit=10,
        thread_id=1,
    )

    # 비동기적으로 에이전트 호출
    result = await agent.ainvoke(
        {"messages": [HumanMessage(content="한국에 대해서 알려주고, 한국 시간도 알려줘")]}, 
        config=config
    )
    
    print("🤖 에이전트 응답:")
    print(result["messages"][-1].content)

# 비동기 함수 실행
asyncio.run(run_agent())