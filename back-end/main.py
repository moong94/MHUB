from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:

    app = FastAPI(
        title="My FastAPI Project",
        description="API documentation",
        version="1.0.0",
    )

    # CORS 설정 추가
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  
        allow_credentials=True,
        allow_methods=["*"], 
        allow_headers=["*"],
    )

    from src.api.routers import api_router

    app.include_router(api_router)

    return app

app = create_app()