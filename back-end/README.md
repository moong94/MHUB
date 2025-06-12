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
        - requirements 사용 설치 : uv add -r requirements.txt
        - 단일 모듈 설치 : uv add [모듈명] or uv pip install [모듈명]
        - 이미 uv.lock 이 있을경우 : uv sync 로 uv.lock 파일을 읽어서 의존성 설치 -> 기존에 설치한 모듈들은 lock에 기록됨
    - fast api 실행방법
        - 폴더 이동 : cd back-end 
        - 가상환경 활성화 : .venv\Scripts\activate
        - uvicorn으로 main에 있는 app을 실행 : uvicorn main:app --reload --port 8000
        - api 확인 Swagger : 127.0.0.1:8000/docs