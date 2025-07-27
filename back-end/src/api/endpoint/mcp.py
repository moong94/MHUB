import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.core.mcp_agent import run_mcp_agent

router = APIRouter()
logger = logging.getLogger(__name__)

class QueryRequest(BaseModel):
    question: str

@router.post("/ask")
async def ask_mcp(request: QueryRequest):
    logger.info(f"질문 요청: {request.question}")
    try:
        answer = await run_mcp_agent(request.question)
        logger.info(f"응답 결과: {answer}")
        return {"answer": answer}
    except Exception as e:
        logger.error(f"에러 발생: {e}")
        raise HTTPException(status_code=500, detail=str(e)) 