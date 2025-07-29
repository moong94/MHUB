# Python example using requests
import requests
from urllib.parse import quote
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

# 환경변수에서 SMITHERY_API_KEY 가져오기
SMITHERY_API_KEY = os.getenv("SMITHERY_API_KEY")

query = 'is:deployed image classification'
encoded_query = quote(query)

response = requests.get(
    f'https://registry.smithery.ai/servers?q={encoded_query}&page=1&pageSize=50',
    headers={
        'Authorization': f'Bearer {SMITHERY_API_KEY}',
        'Accept': 'application/json'
    }
)

data = response.json()
all_servers = data["servers"]
# remote가 true인 서버만 필터링
remote_servers = [server for server in all_servers if server.get("remote") == True]
print(">> 스미더리 mcp 검색")
print(remote_servers)



qualified_name = '@browserbasehq/mcp-browserbase'

response2 = requests.get(
    f'https://registry.smithery.ai/servers/{qualified_name}',
    headers={
        'Authorization': f'Bearer {SMITHERY_API_KEY}',
        'Accept': 'application/json'
    }
)

# data2 = response2.json()
# print(">> 스미더리 mcp 상세")
# print(data2)