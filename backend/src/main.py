"""FastAPI Application Entry Point - Clean Architecture"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config.settings import settings
from src.web.controller import work_controller, skill_controller, about_controller, hero_controller


# FastAPIアプリケーション作成
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ヘルスチェックエンドポイント
@app.get("/")
def health_check():
    """APIヘルスチェック"""
    return {
        "message": "Welcome to Portfolio API (Clean Architecture)",
        "version": settings.PROJECT_VERSION,
        "status": "healthy"
    }


# コントローラールーターの登録
app.include_router(work_controller.router, prefix=settings.API_PREFIX)
app.include_router(skill_controller.router, prefix=settings.API_PREFIX)
app.include_router(about_controller.router, prefix=settings.API_PREFIX)
app.include_router(hero_controller.router, prefix=settings.API_PREFIX)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
