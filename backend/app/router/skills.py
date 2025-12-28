from fastapi import APIRouter, Depends
from app.usecase.skill_usecase import SkillUseCase
from app.domain.entity.skill import Skill
from app.dependencies.dependency_injector import get_skill_usecase

router = APIRouter(prefix="/skills", tags=["skills"])


@router.get("", response_model=list[Skill])
async def get_all_skills(usecase: SkillUseCase = Depends(get_skill_usecase)):
    """全スキル取得"""
    return await usecase.get_all_skills()


@router.get("/categories", response_model=list[str])
async def get_skill_categories(usecase: SkillUseCase = Depends(get_skill_usecase)):
    """カテゴリ一覧取得"""
    return await usecase.get_categories()
