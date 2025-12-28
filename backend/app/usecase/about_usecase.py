from app.domain.i_repository.i_about_repository import IAboutRepository
from app.domain.entity.about import AboutResponse


class AboutUseCase:
    def __init__(self, repository: IAboutRepository):
        self.repository = repository

    async def get_about_data(self) -> AboutResponse:
        """About情報全体取得"""
        about = await self.repository.get_about()
        education = await self.repository.get_education()
        experience = await self.repository.get_experience()
        social_media = await self.repository.get_social_media()

        return AboutResponse(
            bio=about.bio if about else "",
            education=education,
            experience=experience,
            social_media=social_media
        )
