"""Application Settings"""
import os
from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):
    """アプリケーション設定"""

    # Supabase設定
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

    # CORS設定
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]

    # API設定
    API_PREFIX: str = ""
    PROJECT_NAME: str = "Portfolio API"
    PROJECT_VERSION: str = "2.0.0"
    PROJECT_DESCRIPTION: str = "ポートフォリオサイト用のRESTful API (Clean Architecture)"

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
