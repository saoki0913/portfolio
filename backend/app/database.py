from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from supabase import create_client, Client
from app.core.config import settings

# SQLAlchemy設定 - 直接接続を無効化
# engine = create_engine(str(settings.DATABASE_URL))
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()  # モデル定義のために残しておく

# Supabaseクライアント - REST APIを通じてアクセス
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# 互換性のためのダミーDB接続セッション
def get_db():
    # DBは使用せず、Supabaseクライアントを直接使うため
    # ここではダミーセッションを提供
    class DummyDB:
        def close(self):
            pass
    
    db = DummyDB()
    try:
        yield db
    finally:
        pass  # クローズは不要 
