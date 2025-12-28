"""Skill Repository Interface"""
from abc import ABC, abstractmethod
from typing import List, Optional
from src.core.entity.skill import Skill, SkillCategory


class SkillRepository(ABC):
    """スキルのリポジトリインターフェース"""

    @abstractmethod
    def find_all(self, category: Optional[str] = None) -> List[Skill]:
        """
        全スキルを取得

        Args:
            category: カテゴリでフィルタ（Noneの場合は全て）

        Returns:
            List[Skill]: スキルのリスト
        """
        pass

    @abstractmethod
    def find_categories(self) -> List[SkillCategory]:
        """
        カテゴリごとにグループ化されたスキルを取得

        Returns:
            List[SkillCategory]: カテゴリ別スキルのリスト
        """
        pass

    @abstractmethod
    def get_category_names(self) -> List[str]:
        """
        全カテゴリ名を取得

        Returns:
            List[str]: カテゴリ名のリスト
        """
        pass
