from app.domain.i_repository.i_skill_repository import ISkillRepository
from app.domain.entity.skill import Skill


class SkillUseCase:
    def __init__(self, repository: ISkillRepository):
        self.repository = repository

    async def get_all_skills(self) -> list[Skill]:
        """全スキル取得"""
        return await self.repository.find_all()

    async def get_skills_by_category(self, category: str) -> list[Skill]:
        """カテゴリ別スキル取得"""
        return await self.repository.find_by_category(category)

    async def get_categories(self) -> list[str]:
        """カテゴリ一覧取得"""
        return await self.repository.get_categories()
