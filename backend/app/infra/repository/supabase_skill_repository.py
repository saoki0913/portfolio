from supabase import Client as SupabaseClient
from app.domain.i_repository.i_skill_repository import ISkillRepository
from app.domain.entity.skill import Skill


class SupabaseSkillRepository(ISkillRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def find_all(self) -> list[Skill]:
        """全スキル取得（カテゴリ順、名前順）"""
        response = self.client.table("skills").select("*").order("category").order("name").execute()
        return [Skill(**skill) for skill in response.data]

    async def find_by_category(self, category: str) -> list[Skill]:
        """カテゴリ別スキル取得"""
        response = self.client.table("skills").select("*").eq("category", category).order("name").execute()
        return [Skill(**skill) for skill in response.data]

    async def get_categories(self) -> list[str]:
        """スキルカテゴリ一覧取得"""
        response = self.client.table("skills").select("category").execute()
        categories = list(set(skill["category"] for skill in response.data))
        return sorted(categories)
