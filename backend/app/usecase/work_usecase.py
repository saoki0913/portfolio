from fastapi import HTTPException
from app.domain.i_repository.i_work_repository import IWorkRepository
from app.domain.entity.work import Work


class WorkUseCase:
    def __init__(self, repository: IWorkRepository):
        self.repository = repository

    async def get_all_works(self) -> list[Work]:
        """全作品取得"""
        return await self.repository.find_all()

    async def get_work_by_id(self, work_id: str) -> Work:
        """作品詳細取得"""
        work = await self.repository.find_by_id(work_id)
        if not work:
            raise HTTPException(status_code=404, detail="Work not found")
        return work
