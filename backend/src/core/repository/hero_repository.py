"""Hero Repository Interface"""
from abc import ABC, abstractmethod
from typing import List, Optional
from src.core.entity.hero import HeroIntroduction, TimelineItem


class HeroRepository(ABC):
    """ヒーローセクションのリポジトリインターフェース"""

    @abstractmethod
    def find_introduction(self) -> Optional[HeroIntroduction]:
        """
        自己紹介文を取得

        Returns:
            Optional[HeroIntroduction]: 自己紹介文、見つからない場合はNone
        """
        pass

    @abstractmethod
    def find_timeline_items(self) -> List[TimelineItem]:
        """
        タイムラインアイテムを取得（sort_order昇順）

        Returns:
            List[TimelineItem]: タイムラインアイテムのリスト
        """
        pass
