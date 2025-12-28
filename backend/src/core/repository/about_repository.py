"""About Repository Interface"""
from abc import ABC, abstractmethod
from typing import Optional
from src.core.entity.about import About


class AboutRepository(ABC):
    """プロフィール情報のリポジトリインターフェース"""

    @abstractmethod
    def find_about_info(self) -> Optional[About]:
        """
        プロフィール情報を取得（学歴・職歴・SNS含む）

        Returns:
            Optional[About]: プロフィール情報、見つからない場合はNone
        """
        pass
