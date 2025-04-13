import os
from pydantic import BaseSettings, EmailStr

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Portfolio API"
    
    # Email設定
    EMAILS_ENABLED: bool = False
    SMTP_TLS: bool = True
    SMTP_PORT: int = 587
    SMTP_HOST: str = ""
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM_EMAIL: EmailStr = "noreply@example.com"
    EMAILS_FROM_NAME: str = "Portfolio Contact"
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    EMAIL_TEMPLATES_DIR: str = "app/email-templates"
    EMAILS_ENABLED: bool = False
    
    # 受信メールアドレス
    EMAIL_RECIPIENT: EmailStr = "your-email@example.com"
    
    # デモ用のダミーデータを使用するかどうか
    USE_DUMMY_DATA: bool = True
    
    # CORSオリジン
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings() 
