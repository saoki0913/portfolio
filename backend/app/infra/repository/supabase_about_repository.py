from supabase import Client as SupabaseClient
from app.domain.i_repository.i_about_repository import IAboutRepository
from app.domain.entity.about import About, Education, Experience, SocialMedia


class SupabaseAboutRepository(IAboutRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def get_about(self) -> About | None:
        """自己紹介取得"""
        response = self.client.table("about").select("*").limit(1).execute()
        if response.data:
            return About(**response.data[0])
        return None

    async def get_education(self) -> list[Education]:
        """学歴取得"""
        response = self.client.table("education").select("*").order("order_index").execute()
        return [Education(**edu) for edu in response.data]

    async def get_experience(self) -> list[Experience]:
        """職歴取得"""
        response = self.client.table("experience").select("*").order("order_index").execute()
        return [Experience(**exp) for exp in response.data]

    async def get_social_media(self) -> list[SocialMedia]:
        """ソーシャルメディア取得"""
        response = self.client.table("social_media").select("*").order("order_index").execute()
        return [SocialMedia(**sm) for sm in response.data]
