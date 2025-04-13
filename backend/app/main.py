from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router

app = FastAPI(
    title="Portfolio API",
    description="Portfolio website backend API",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境では実際のドメインに制限すること
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIルーターをマウント
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Portfolio API is running. See /docs for API documentation."} 
