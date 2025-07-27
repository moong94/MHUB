from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# API KEY 정보로드
load_dotenv()

OUTPUT_TOKEN_INFO = {
    "claude-3-5-sonnet-latest": {"max_tokens": 8192},
    "claude-3-5-haiku-latest": {"max_tokens": 8192},
    "claude-3-7-sonnet-latest": {"max_tokens": 64000},
    "gpt-4o": {"max_tokens": 16000},
    "gpt-4o-mini": {"max_tokens": 16000},
    "gemini-1.5-pro": {"max_tokens": 8192},
}

def create_chat_model(model, temperature=0.1):
    return ChatOpenAI(model=model, temperature=temperature, max_tokens=OUTPUT_TOKEN_INFO[model]["max_tokens"])