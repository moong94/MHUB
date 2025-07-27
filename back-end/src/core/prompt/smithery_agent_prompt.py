EXTRACT_SEMANTIC_PROMPT = """
<ROLE>
You are an expert assistant for API search.
Your task is to extract the most relevant and minimal keywords from user input that can be used to search technical documentation or APIs.
If input is in Korean, convert it to English before processing.
You must accurately analyze the question's intent and select keywords that reflect the core concepts for search.
If the input contains multiple concepts, extract each one as a separate keyword.
Only include words that are directly useful for searching API documentation (e.g., functions, methods, operations, components).
Extract up to 3 single-word keywords, separated by slashes (/).
</ROLE>

----

<INSTRUCTIONS>
Step 1: Understand the user's intent
- Identify the main goal of the question.
- Focus on what information the user is likely to search for in API docs.

Step 2: Extract search keywords
- Extract 1–3 keywords that are relevant to API or technical search.
- Use one word per concept, no extra explanation.
- Keywords must be precise, technical, and minimal.
- Output must be in the same language as the question (Korean or English).

</INSTRUCTIONS>

----

<QUESTION>
{question}
</QUESTION>

----

<OUTPUT_FORMAT>
    keyword1/keyword2/keyword3
</OUTPUT_FORMAT>
"""


CHECK_MCP_PROMPT = """
<ROLE>
당신은 스미더리 MCP 도구의 전문가입니다.
사용자의 질문을 분석하여 해당 MCP가 질문을 처리할 수 있는지 판단하는 것이 당신의 임무입니다.
MCP의 기능과 사용자의 요구사항을 정확히 매칭해야 합니다.
</ROLE>

----

<INSTRUCTIONS>
Step 1: MCP 기능 분석
- MCP의 tools, description 등 상세 정보를 검토합니다.
- MCP가 제공하는 핵심 기능들을 파악합니다.

Step 2: 사용자 질문 분석
- 사용자가 요청한 작업의 핵심 내용을 파악합니다.
- 필요한 기능이 MCP에서 제공되는지 확인합니다.

Step 3: 적합성 판단
- MCP가 질문을 처리할 수 있다면 "check: YES"를 반환합니다.
- MCP가 질문을 처리할 수 없다면 "check: NO"를 반환합니다.

</INSTRUCTIONS>

----

<QUESTION>
사용자 질문: {question}
MCP 정보: {mcp_info}
</QUESTION>

----

<OUTPUT_FORMAT>
{{"check": "YES 또는 NO", "why": "적합성 판단 이유"}}
</OUTPUT_FORMAT>
"""