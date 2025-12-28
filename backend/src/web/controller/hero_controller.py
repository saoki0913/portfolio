"""Hero Controller - HTTPリクエスト処理"""
from fastapi import APIRouter, HTTPException, Depends
from src.core.service.hero_service import HeroService


router = APIRouter(prefix="/hero", tags=["hero"])


def get_hero_service() -> HeroService:
    """HeroServiceの依存性注入"""
    from src.config.dependencies import get_hero_service as di_get_hero_service
    return di_get_hero_service()


@router.get("/introduction", response_model=dict)
def get_introduction(
    hero_service: HeroService = Depends(get_hero_service)
):
    """自己紹介文を取得"""
    try:
        introduction = hero_service.get_introduction()
        return introduction.to_dict()
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/timeline", response_model=dict)
def get_timeline_items(
    hero_service: HeroService = Depends(get_hero_service)
):
    """タイムラインアイテムを取得（sort_order昇順）"""
    try:
        items = hero_service.get_timeline_items()
        return {"items": [item.to_dict() for item in items]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
