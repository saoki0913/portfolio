from supabase import Client as SupabaseClient
from app.domain.i_repository.i_hero_repository import IHeroRepository
from app.domain.entity.hero import HeroIntroduction, TimelineItem


class SupabaseHeroRepository(IHeroRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def get_introduction(self) -> HeroIntroduction | None:
        """ヒーロー自己紹介取得"""
        response = self.client.table("hero_introduction").select("*").limit(1).execute()
        if response.data:
            return HeroIntroduction(**response.data[0])
        return None

    async def get_timeline(self) -> list[TimelineItem]:
        """タイムライン取得"""
        response = self.client.table("timeline_items").select("*").order("order_index").execute()
        return [TimelineItem(**item) for item in response.data]
