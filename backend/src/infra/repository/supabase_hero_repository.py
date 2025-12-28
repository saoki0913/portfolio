"""Supabase Hero Repository Implementation"""
from typing import List, Optional
from supabase import Client
from src.core.entity.hero import HeroIntroduction, TimelineItem
from src.core.repository.hero_repository import HeroRepository


class SupabaseHeroRepository(HeroRepository):
    """Supabaseを使用したヒーローセクションのリポジトリ実装"""

    def __init__(self, supabase_client: Client):
        self.supabase = supabase_client

    def find_introduction(self) -> Optional[HeroIntroduction]:
        """自己紹介文を取得"""
        response = self.supabase.table("hero_introduction").select("*").limit(1).execute()

        if not response.data:
            return None

        return HeroIntroduction.from_dict(response.data[0])

    def find_timeline_items(self) -> List[TimelineItem]:
        """タイムラインアイテムを取得（sort_order昇順）"""
        response = self.supabase.table("timeline_items").select("*").order("sort_order", desc=False).execute()

        return [TimelineItem.from_dict(item_data) for item_data in response.data]
