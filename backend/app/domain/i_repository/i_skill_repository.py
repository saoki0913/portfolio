from abc import ABC, abstractmethod
from app.domain.entity.skill import Skill


class ISkillRepository(ABC):
    @abstractmethod
    async def find_all(self) -> list[Skill]:
        """全スキル取得"""
        pass

    @abstractmethod
    async def find_by_category(self, category: str) -> list[Skill]:
        """カテゴリ別スキル取得"""
        pass

    @abstractmethod
    async def get_categories(self) -> list[str]:
        """カテゴリ一覧取得"""
        pass
