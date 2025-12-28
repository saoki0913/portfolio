"""Work Repository Interface"""
from abc import ABC, abstractmethod
from typing import List, Optional
from src.core.entity.work import Work


class WorkRepository(ABC):
    """プロジェクト作品のリポジトリインターフェース"""

    @abstractmethod
    def find_all(self, featured: Optional[bool] = None, category: Optional[str] = None) -> List[Work]:
        """
        全プロジェクトを取得

        Args:
            featured: 注目プロジェクトでフィルタ（Noneの場合は全て）
            category: カテゴリでフィルタ（Noneの場合は全て）

        Returns:
            List[Work]: プロジェクトのリスト
        """
        pass

    @abstractmethod
    def find_by_id(self, work_id: str) -> Optional[Work]:
        """
        IDでプロジェクトを取得

        Args:
            work_id: プロジェクトID

        Returns:
            Optional[Work]: 見つかった場合はWorkエンティティ、見つからない場合はNone
        """
        pass
