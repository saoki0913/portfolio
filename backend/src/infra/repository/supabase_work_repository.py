"""Supabase Work Repository Implementation"""
from typing import List, Optional
from supabase import Client
from src.core.entity.work import Work
from src.core.repository.work_repository import WorkRepository


class SupabaseWorkRepository(WorkRepository):
    """Supabaseを使用したプロジェクト作品のリポジトリ実装"""

    def __init__(self, supabase_client: Client):
        self.supabase = supabase_client

    def find_all(self, featured: Optional[bool] = None, category: Optional[str] = None) -> List[Work]:
        """全プロジェクトを取得"""
        query = self.supabase.table("works").select("*")

        if featured is not None:
            query = query.eq("featured", featured)

        if category is not None:
            query = query.eq("category", category)

        response = query.execute()
        return [Work.from_dict(work_data) for work_data in response.data]

    def find_by_id(self, work_id: str) -> Optional[Work]:
        """IDでプロジェクトを取得"""
        response = self.supabase.table("works").select("*").eq("id", work_id).execute()

        if not response.data:
            return None

        return Work.from_dict(response.data[0])
