"""Work Controller - HTTPリクエスト処理"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from src.core.service.work_service import WorkService
from src.core.entity.work import Work


router = APIRouter(prefix="/works", tags=["works"])


def get_work_service() -> WorkService:
    """WorkServiceの依存性注入（後でDIコンテナで置き換え）"""
    from src.config.dependencies import get_work_service as di_get_work_service
    return di_get_work_service()


@router.get("", response_model=dict)
def get_all_works(
    featured: Optional[bool] = None,
    category: Optional[str] = None,
    work_service: WorkService = Depends(get_work_service)
):
    """
    全プロジェクトを取得

    - **featured**: 注目プロジェクトでフィルタ（オプション）
    - **category**: カテゴリでフィルタ（オプション）
    """
    try:
        works = work_service.get_all_works(featured=featured, category=category)
        return {"works": [work.to_dict() for work in works]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{work_id}", response_model=dict)
def get_work_by_id(
    work_id: str,
    work_service: WorkService = Depends(get_work_service)
):
    """
    IDでプロジェクトを取得

    - **work_id**: プロジェクトID
    """
    try:
        work = work_service.get_work_by_id(work_id)
        return work.to_dict()
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
