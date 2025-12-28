"""Skill Application Service"""
from typing import List, Optional
from src.core.entity.skill import Skill, SkillCategory
from src.core.repository.skill_repository import SkillRepository


class SkillService:
    """スキルに関するビジネスロジック"""

    def __init__(self, skill_repository: SkillRepository):
        self.skill_repository = skill_repository

    def get_all_skills(self, category: Optional[str] = None) -> List[Skill]:
        """
        全スキルを取得

        Args:
            category: カテゴリでフィルタ

        Returns:
            List[Skill]: スキルのリスト
        """
        return self.skill_repository.find_all(category=category)

    def get_skill_categories(self) -> List[SkillCategory]:
        """
        カテゴリごとにグループ化されたスキルを取得

        Returns:
            List[SkillCategory]: カテゴリ別スキルのリスト
        """
        return self.skill_repository.find_categories()

    def get_category_names(self) -> List[str]:
        """
        全カテゴリ名を取得

        Returns:
            List[str]: カテゴリ名のリスト
        """
        return self.skill_repository.get_category_names()
