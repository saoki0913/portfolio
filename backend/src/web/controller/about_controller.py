"""About Controller - HTTPリクエスト処理"""
from fastapi import APIRouter, HTTPException, Depends
from src.core.service.about_service import AboutService


router = APIRouter(prefix="/about", tags=["about"])


def get_about_service() -> AboutService:
    """AboutServiceの依存性注入"""
    from src.config.dependencies import get_about_service as di_get_about_service
    return di_get_about_service()


@router.get("", response_model=dict)
def get_about_info(
    about_service: AboutService = Depends(get_about_service)
):
    """プロフィール情報を取得（学歴・職歴・SNS含む）"""
    try:
        about = about_service.get_about_info()
        return about.to_dict()
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
