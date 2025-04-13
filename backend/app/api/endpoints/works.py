from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.schemas.works import Work, WorkList
from app.core.config import settings
from app.data.dummy_data import works_data

router = APIRouter()

@router.get("/", response_model=WorkList)
async def get_all_works(
    featured: Optional[bool] = Query(None, description="Filter by featured status"),
    category: Optional[str] = Query(None, description="Filter by category")
):
    """
    すべてのプロジェクト作品を取得
    """
    filtered_works = works_data
    
    if featured is not None:
        filtered_works = [work for work in filtered_works if work["featured"] == featured]
    
    if category:
        filtered_works = [work for work in filtered_works if work["category"].lower() == category.lower()]
    
    return {"works": filtered_works}

@router.get("/{work_id}", response_model=Work)
async def get_work_by_id(work_id: str):
    """
    IDでプロジェクト作品を取得
    """
    for work in works_data:
        if work["id"] == work_id:
            return work
    
    raise HTTPException(status_code=404, detail=f"Work with ID {work_id} not found") 
