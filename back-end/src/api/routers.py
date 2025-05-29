from fastapi import APIRouter
from .endpoint import test

api_router = APIRouter()

api_router.include_router(test.router, prefix="/test", tags=["test"])