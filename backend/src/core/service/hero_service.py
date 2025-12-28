"""Hero Application Service"""
from typing import List
from src.core.entity.hero import HeroIntroduction, TimelineItem
from src.core.repository.hero_repository import HeroRepository


class HeroService:
    """ヒーローセクションに関するビジネスロジック"""

    def __init__(self, hero_repository: HeroRepository):
        self.hero_repository = hero_repository

    def get_introduction(self) -> HeroIntroduction:
        """
        自己紹介文を取得

        Returns:
            HeroIntroduction: 自己紹介文

        Raises:
            ValueError: 自己紹介文が見つからない場合
        """
        introduction = self.hero_repository.find_introduction()
        if introduction is None:
            raise ValueError("Hero introduction not found")
        return introduction

    def get_timeline_items(self) -> List[TimelineItem]:
        """
        タイムラインアイテムを取得（sort_order昇順）

        Returns:
            List[TimelineItem]: タイムラインアイテムのリスト
        """
        return self.hero_repository.find_timeline_items()
