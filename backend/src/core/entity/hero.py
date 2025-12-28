"""Hero Entity - ドメインモデル"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class HeroIntroduction:
    """ヒーローセクション自己紹介のドメインモデル"""
    id: str
    content: str

    @classmethod
    def from_dict(cls, data: dict) -> "HeroIntroduction":
        """辞書からHeroIntroductionエンティティを生成"""
        return cls(
            id=data["id"],
            content=data["content"]
        )

    def to_dict(self) -> dict:
        """HeroIntroductionエンティティを辞書に変換"""
        return {
            "id": self.id,
            "content": self.content
        }


@dataclass
class TimelineItem:
    """タイムラインアイテムのドメインモデル"""
    id: str
    period: str
    title: str
    subtitle: Optional[str] = None
    sort_order: int = 0

    @classmethod
    def from_dict(cls, data: dict) -> "TimelineItem":
        """辞書からTimelineItemエンティティを生成"""
        return cls(
            id=data["id"],
            period=data["period"],
            title=data["title"],
            subtitle=data.get("subtitle"),
            sort_order=data.get("sort_order", 0)
        )

    def to_dict(self) -> dict:
        """TimelineItemエンティティを辞書に変換"""
        return {
            "id": self.id,
            "period": self.period,
            "title": self.title,
            "subtitle": self.subtitle,
            "sort_order": self.sort_order
        }
