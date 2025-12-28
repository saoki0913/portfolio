from app.domain.i_repository.i_hero_repository import IHeroRepository
from app.domain.entity.hero import HeroIntroduction, TimelineItem


class HeroUseCase:
    def __init__(self, repository: IHeroRepository):
        self.repository = repository

    async def get_introduction(self) -> HeroIntroduction | None:
        """ヒーロー自己紹介取得"""
        return await self.repository.get_introduction()

    async def get_timeline(self) -> list[TimelineItem]:
        """タイムライン取得"""
        return await self.repository.get_timeline()
