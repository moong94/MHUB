back-end

### 환경 설정 및 준비
- uv 프로젝트
    - 가상환경 python 버전 : 3.12.10
    - uv 설치
        - Window : powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
        - macOS/Linux : curl -LsSf https://astral.sh/uv/install.sh | sh
    - 가상환경 
        - 초기화 : uv init
        - 생성 : uv venv --python 3.12.10
        - 활성화 : .venv\Scripts\activate
        - 비활성화 : deactivate
    - 의존성 설치(꼭 가상환경 활성화 후 설치)
        - requirements 사용하여 기존 모듈 설치 : uv pip install -r requirements.txt
        - 추가 모듈 설치 필요 시 : uv pip install [모듈명]
        - 추가 모듈 설치 시 requirements 업데이트 : uv pip freeze > requirements.txt
    - fast api 실행방법
        - 폴더 이동 : cd back-end 
        - 가상환경 활성화 : .venv\Scripts\activate
        - uvicorn으로 main에 있는 app을 실행 : uvicorn main:app --reload --port 8000
        - api 확인 Swagger : 127.0.0.1:8000/docs

- .env_smaple과 같은 경로에 .env파일 생성
    - 테스트를 위해 OPENAI_API_KEY, SMITHERY_API_KEY 설정 필수 (추후 사용자한테서 입력 받는걸로 수정 필요)
    - langsmith 세팅은 테스트 필요 시 설정, 불필요 시 삭제

## API
- /mcp/smithery 

REQ
```
{
    "questions": ["한국에 대해서 검색해서 알려줘", ...]
}

```
RES
```
{
    "smithery_info": [
        {
            "qualifiedName": "스미더리 결과 서버 이름",
            "query": "질의 내용",
            "connections": {
                "type": "http",
                "deploymentUrl": "스미더리 서버 호출 url",
                "configSchema": {
                    "type": "config 타입으로 string, number, object, array가　올 수 있다 (필수값o)",
                    "required": [ //필수 key정보가 들어있다. 필수 key가 없다 ex) ["key1", "key2", ...] 해당 필드가 없다면 필수값이 없다는 뜻
                        "key1",
                        "key2",
                        "key3",
                        "key4",
                        ...
                    ],
                    "properties": { //전체 key 정보이며, 필수 key에 없는 정보는 옵셔널값이다. (필수값o)
                        "key1": { // key 이름
                            "type": "object",
                            "properties": {
                                "key1": {
                                    "type": "string or number or object or array",
                                    ...
                                "description": "설명 필수값 x"
                                },
                                ...
                            }
                        },
                        "key2": {
                            "type": "array",
                            "items": { // 데이터 타입이 array이면 items
                                "type": "string or number or object or array",
                                "properties": { //object일때
                                    "key1": {
                                        "type": "string"
                                        ...
                                    },
                                    ...
                                }
                            },
                            "description": "설명 필수값 x"
                        },
                        "key3": {
                            "type": "string",
                            "description": "설명 필수값 x"
                        },
                        "key4": {
                            "type": "number"
                        },
                        "key5": { //required 에 없는 필드이기 때문에 optional
                            "type": "string",
                            "description": "설명 필수값 x"
                        }
                    },
                    "description": "설명 필수값 x"
                }
            }
        },
        ...
    ]
}
```

- /mcp/ask

REQ
```
...
```

RES
```
...
```