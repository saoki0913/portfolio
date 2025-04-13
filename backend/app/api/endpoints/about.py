from fastapi import APIRouter

from app.schemas.about import About
from app.core.config import settings
from app.data.dummy_data import about_data

router = APIRouter()

@router.get("/", response_model=About)
async def get_about_info():
    """
    プロフィール情報を取得
    """
    return about_data 
