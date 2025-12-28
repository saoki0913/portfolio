from abc import ABC, abstractmethod
from app.domain.entity.hero import HeroIntroduction, TimelineItem


class IHeroRepository(ABC):
    @abstractmethod
    async def get_introduction(self) -> HeroIntroduction | None:
        """ヒーロー自己紹介取得"""
        pass

    @abstractmethod
    async def get_timeline(self) -> list[TimelineItem]:
        """タイムライン取得"""
        pass
