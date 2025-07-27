from fastapi import APIRouter
from .endpoint import test
from .endpoint import mcp

api_router = APIRouter()

api_router.include_router(test.router, prefix="/test", tags=["test"])
api_router.include_router(mcp.router, prefix="/mcp", tags=["mcp"])