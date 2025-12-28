"""About Application Service"""
from src.core.entity.about import About
from src.core.repository.about_repository import AboutRepository


class AboutService:
    """プロフィール情報に関するビジネスロジック"""

    def __init__(self, about_repository: AboutRepository):
        self.about_repository = about_repository

    def get_about_info(self) -> About:
        """
        プロフィール情報を取得（学歴・職歴・SNS含む）

        Returns:
            About: プロフィール情報

        Raises:
            ValueError: プロフィール情報が見つからない場合
        """
        about = self.about_repository.find_about_info()
        if about is None:
            raise ValueError("About information not found")
        return about
