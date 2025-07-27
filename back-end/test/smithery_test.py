# Python example using requests
import requests
from urllib.parse import quote

api_key = '30a785ef-b049-4f6c-ac9d-cc606a9756fe'
query = 'is:deployed github'
encoded_query = quote(query)

# response = requests.get(
#     f'https://registry.smithery.ai/servers?q={encoded_query}&page=1&pageSize=10',
#     headers={
#         'Authorization': f'Bearer {api_key}',
#         'Accept': 'application/json'
#     }
# )

# data = response.json()
# print(">> 스미더리 mcp 검색")
# print(data)



qualified_name = '@smithery-ai/github'

response2 = requests.get(
    f'https://registry.smithery.ai/servers/{qualified_name}',
    headers={
        'Authorization': f'Bearer {api_key}',
        'Accept': 'application/json'
    }
)

data2 = response2.json()
print(">> 스미더리 mcp 상세")
print(data2)