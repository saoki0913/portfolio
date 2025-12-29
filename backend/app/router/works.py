from fastapi import APIRouter, Depends
from app.usecase.work_usecase import WorkUseCase
from app.domain.entity.work import Work
from app.dependencies.dependency_injector import get_work_usecase

router = APIRouter(prefix="/works", tags=["works"])


@router.get("", response_model=list[Work])
async def get_all_works(usecase: WorkUseCase = Depends(get_work_usecase)):
    """全作品取得"""
    return await usecase.get_all_works()


@router.get("/{work_id}", response_model=Work)
async def get_work_by_id(work_id: str, usecase: WorkUseCase = Depends(get_work_usecase)):
    """作品詳細取得"""
    return await usecase.get_work_by_id(work_id)
