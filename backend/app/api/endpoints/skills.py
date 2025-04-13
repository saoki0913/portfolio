from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.schemas.skills import SkillList, SkillCategory, Skill
from app.core.config import settings
from app.data.dummy_data import skills_data

router = APIRouter()

@router.get("/", response_model=SkillList)
async def get_all_skills(
    category: Optional[str] = Query(None, description="Filter by category name")
):
    """
    すべてのスキルを取得
    """
    if category:
        filtered_categories = [cat for cat in skills_data["categories"] 
                             if cat["name"].lower() == category.lower()]
        if not filtered_categories:
            return {"categories": []}
        return {"categories": filtered_categories}
    
    return skills_data

@router.get("/categories", response_model=List[str])
async def get_skill_categories():
    """
    スキルカテゴリーの一覧を取得
    """
    return [category["name"] for category in skills_data["categories"]] 
