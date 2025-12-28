from fastapi import APIRouter, Depends
from app.usecase.about_usecase import AboutUseCase
from app.domain.entity.about import AboutResponse
from app.dependencies.dependency_injector import get_about_usecase

router = APIRouter(prefix="/about", tags=["about"])


@router.get("", response_model=AboutResponse)
async def get_about(usecase: AboutUseCase = Depends(get_about_usecase)):
    """About情報全体取得"""
    return await usecase.get_about_data()
