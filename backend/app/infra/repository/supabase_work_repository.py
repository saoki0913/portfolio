from supabase import Client as SupabaseClient
from app.domain.i_repository.i_work_repository import IWorkRepository
from app.domain.entity.work import Work


class SupabaseWorkRepository(IWorkRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def find_all(self) -> list[Work]:
        """全作品取得（featuredが先、その後created_at降順）"""
        response = self.client.table("works").select("*").order("featured", desc=True).order("created_at", desc=True).execute()
        return [Work(**work) for work in response.data]

    async def find_by_id(self, work_id: str) -> Work | None:
        """作品詳細取得"""
        response = self.client.table("works").select("*").eq("id", work_id).execute()
        if response.data:
            return Work(**response.data[0])
        return None
