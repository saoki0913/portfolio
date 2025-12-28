"""Skill Controller - HTTPリクエスト処理"""
from fastapi import APIRouter, HTTPException, Depends
from typing import Optional
from src.core.service.skill_service import SkillService


router = APIRouter(prefix="/skills", tags=["skills"])


def get_skill_service() -> SkillService:
    """SkillServiceの依存性注入"""
    from src.config.dependencies import get_skill_service as di_get_skill_service
    return di_get_skill_service()


@router.get("", response_model=dict)
def get_all_skills(
    category: Optional[str] = None,
    skill_service: SkillService = Depends(get_skill_service)
):
    """
    カテゴリごとにグループ化されたスキルを取得

    - **category**: カテゴリでフィルタ（オプション）
    """
    try:
        categories = skill_service.get_skill_categories()
        return {"categories": [cat.to_dict() for cat in categories]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/categories", response_model=dict)
def get_category_names(
    skill_service: SkillService = Depends(get_skill_service)
):
    """全カテゴリ名を取得"""
    try:
        categories = skill_service.get_category_names()
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
