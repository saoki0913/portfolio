"""Work Application Service"""
from typing import List, Optional
from src.core.entity.work import Work
from src.core.repository.work_repository import WorkRepository


class WorkService:
    """プロジェクト作品に関するビジネスロジック"""

    def __init__(self, work_repository: WorkRepository):
        self.work_repository = work_repository

    def get_all_works(self, featured: Optional[bool] = None, category: Optional[str] = None) -> List[Work]:
        """
        全プロジェクトを取得

        Args:
            featured: 注目プロジェクトでフィルタ
            category: カテゴリでフィルタ

        Returns:
            List[Work]: プロジェクトのリスト
        """
        return self.work_repository.find_all(featured=featured, category=category)

    def get_work_by_id(self, work_id: str) -> Work:
        """
        IDでプロジェクトを取得

        Args:
            work_id: プロジェクトID

        Returns:
            Work: プロジェクトエンティティ

        Raises:
            ValueError: プロジェクトが見つからない場合
        """
        work = self.work_repository.find_by_id(work_id)
        if work is None:
            raise ValueError(f"Work with id '{work_id}' not found")
        return work
