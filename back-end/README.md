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