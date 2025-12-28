"""Error Response Models"""
from typing import Optional
from pydantic import BaseModel


class ErrorDetail(BaseModel):
    """エラー詳細"""
    message: str
    field: Optional[str] = None


class ErrorResponse(BaseModel):
    """統一エラーレスポンス"""
    error: str
    detail: str
    status_code: int
