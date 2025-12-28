from abc import ABC, abstractmethod
from app.domain.entity.about import About, Education, Experience, SocialMedia


class IAboutRepository(ABC):
    @abstractmethod
    async def get_about(self) -> About | None:
        """自己紹介取得"""
        pass

    @abstractmethod
    async def get_education(self) -> list[Education]:
        """学歴取得"""
        pass

    @abstractmethod
    async def get_experience(self) -> list[Experience]:
        """職歴取得"""
        pass

    @abstractmethod
    async def get_social_media(self) -> list[SocialMedia]:
        """ソーシャルメディア取得"""
        pass
