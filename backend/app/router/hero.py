from fastapi import APIRouter, Depends
from app.usecase.hero_usecase import HeroUseCase
from app.domain.entity.hero import HeroIntroduction, TimelineItem
from app.dependencies.dependency_injector import get_hero_usecase

router = APIRouter(prefix="/hero", tags=["hero"])


@router.get("/introduction", response_model=HeroIntroduction)
async def get_hero_introduction(usecase: HeroUseCase = Depends(get_hero_usecase)):
    """ヒーロー自己紹介取得"""
    intro = await usecase.get_introduction()
    if not intro:
        return {"id": 0, "introduction_text": ""}
    return intro


@router.get("/timeline", response_model=list[TimelineItem])
async def get_timeline(usecase: HeroUseCase = Depends(get_hero_usecase)):
    """タイムライン取得"""
    return await usecase.get_timeline()
