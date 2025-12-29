from abc import ABC, abstractmethod
from app.domain.entity.work import Work


class IWorkRepository(ABC):
    @abstractmethod
    async def find_all(self) -> list[Work]:
        """全作品取得"""
        pass

    @abstractmethod
    async def find_by_id(self, work_id: str) -> Work | None:
        """作品詳細取得"""
        pass
