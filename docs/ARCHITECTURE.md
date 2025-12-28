# アーキテクチャ設計

## システム構成

### 全体アーキテクチャ
```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Next.js 16 App)                  │
│                  Vercel Edge Network (CDN)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 FastAPI Application (Render)                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │
│  │  Router  │→│ UseCase  │→│  Domain  │→│Infrastructure│    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Supabase     │
                │  (PostgreSQL)   │
                │   + RLS + API   │
                └─────────────────┘
```

## レイヤーアーキテクチャ

### クリーンアーキテクチャの採用
本システムはクリーンアーキテクチャパターンを採用し、各層の責務を明確に分離しています。

```
backend/
└── app/
    ├── router/          # プレゼンテーション層
    │   ├── works.py
    │   ├── skills.py
    │   ├── about.py
    │   ├── hero.py
    │   └── contact.py
    ├── usecase/         # アプリケーション層
    │   ├── work_usecase.py
    │   ├── skill_usecase.py
    │   ├── about_usecase.py
    │   ├── hero_usecase.py
    │   └── contact_usecase.py
    ├── domain/          # ドメイン層
    │   ├── entity/      # エンティティ
    │   │   ├── work.py
    │   │   ├── skill.py
    │   │   ├── about.py
    │   │   ├── hero.py
    │   │   └── contact.py
    │   └── i_repository/# リポジトリインターフェース
    │       ├── i_work_repository.py
    │       ├── i_skill_repository.py
    │       ├── i_about_repository.py
    │       ├── i_hero_repository.py
    │       └── i_contact_repository.py
    ├── infra/           # インフラストラクチャ層
    │   └── repository/  # リポジトリ実装
    │       ├── supabase_work_repository.py
    │       ├── supabase_skill_repository.py
    │       ├── supabase_about_repository.py
    │       ├── supabase_hero_repository.py
    │       └── supabase_contact_repository.py
    ├── dependencies/    # 依存性注入
    │   └── dependency_injector.py
    └── main.py          # FastAPIエントリーポイント
```

### 各層の責務

#### 1. Router層（プレゼンテーション層）
- HTTPリクエスト/レスポンスの処理
- 認証・認可の確認（今回は公開データのみ）
- バリデーション（Pydantic）
- UseCaseの呼び出し

**例**: `router/works.py`
```python
from fastapi import APIRouter, Depends
from app.usecase.work_usecase import WorkUseCase
from app.domain.entity.work import Work
from app.dependencies.dependency_injector import get_work_usecase

router = APIRouter()

@router.get("/works", response_model=list[Work])
async def get_all_works(usecase: WorkUseCase = Depends(get_work_usecase)):
    """全作品取得"""
    return await usecase.get_all_works()

@router.get("/works/{work_id}", response_model=Work)
async def get_work_by_id(work_id: int, usecase: WorkUseCase = Depends(get_work_usecase)):
    """作品詳細取得"""
    return await usecase.get_work_by_id(work_id)
```

#### 2. UseCase層（アプリケーション層）
- ビジネスロジックのオーケストレーション
- トランザクション管理（今回は読み取り専用のため不要）
- 複数のリポジトリを協調させる処理
- ドメインエンティティの変換

**例**: `usecase/work_usecase.py`
```python
from app.domain.i_repository.i_work_repository import IWorkRepository
from app.domain.entity.work import Work

class WorkUseCase:
    def __init__(self, repository: IWorkRepository):
        self.repository = repository

    async def get_all_works(self) -> list[Work]:
        """全作品取得"""
        return await self.repository.find_all()

    async def get_work_by_id(self, work_id: int) -> Work:
        """作品詳細取得"""
        work = await self.repository.find_by_id(work_id)
        if not work:
            raise HTTPException(status_code=404, detail="Work not found")
        return work
```

#### 3. Domain層（ドメイン層）
- ビジネスルールの定義
- エンティティ（Pydantic BaseModel）
- リポジトリインターフェース（ABC）
- バリューオブジェクト

**例**: `domain/entity/work.py`
```python
from pydantic import BaseModel

class Work(BaseModel):
    id: int
    title: str
    description: str
    tech_stack: list[str]
    github_url: str | None = None
    demo_url: str | None = None
    image_url: str | None = None
    order_index: int
```

**例**: `domain/i_repository/i_work_repository.py`
```python
from abc import ABC, abstractmethod
from app.domain.entity.work import Work

class IWorkRepository(ABC):
    @abstractmethod
    async def find_all(self) -> list[Work]:
        """全作品取得"""
        pass

    @abstractmethod
    async def find_by_id(self, work_id: int) -> Work | None:
        """作品詳細取得"""
        pass
```

#### 4. Infrastructure層（インフラストラクチャ層）
- 外部システムとの接続
- データベースアクセス（Supabase）
- 外部API通信
- キャッシュ実装（今回は未実装）

**例**: `infra/repository/supabase_work_repository.py`
```python
from supabase import Client as SupabaseClient
from app.domain.i_repository.i_work_repository import IWorkRepository
from app.domain.entity.work import Work

class SupabaseWorkRepository(IWorkRepository):
    def __init__(self, client: SupabaseClient):
        self.client = client

    async def find_all(self) -> list[Work]:
        """全作品取得"""
        response = self.client.table("works").select("*").order("order_index").execute()
        return [Work(**work) for work in response.data]

    async def find_by_id(self, work_id: int) -> Work | None:
        """作品詳細取得"""
        response = self.client.table("works").select("*").eq("id", work_id).execute()
        if response.data:
            return Work(**response.data[0])
        return None
```

## 主要な設計パターン

### リポジトリパターン
データアクセスロジックをビジネスロジックから分離：
- インターフェース定義: `domain/i_repository/`
- Supabase実装: `infra/repository/`
- DB、外部APIアクセスを統一的に扱う

### 依存性注入（DI）
FastAPIの`Depends`による依存性管理：
- 設定: `dependencies/dependency_injector.py`
- UseCaseへの自動注入
- テスタビリティの向上

**例**: `dependencies/dependency_injector.py`
```python
from supabase import create_client, Client as SupabaseClient
from app.config.settings import settings
from app.infra.repository.supabase_work_repository import SupabaseWorkRepository
from app.usecase.work_usecase import WorkUseCase

def get_supabase_client() -> SupabaseClient:
    """Supabaseクライアント取得"""
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_work_usecase(client: SupabaseClient = Depends(get_supabase_client)) -> WorkUseCase:
    """WorkUseCase取得（DI）"""
    repository = SupabaseWorkRepository(client)
    return WorkUseCase(repository)
```

### インターフェース分離の原則
各リポジトリは必要最小限のメソッドのみを持つ：
- `IWorkRepository`: `find_all()`, `find_by_id()`
- `ISkillRepository`: `find_all()`, `find_by_category()`
- `IAboutRepository`: `find()`
- `IHeroRepository`: `get_introduction()`, `get_timeline()`
- `IContactRepository`: `send_email()`

## データフロー

### 1. リクエスト処理フロー
```
1. Client (Next.js) → Vercel Edge Network
2. Vercel → FastAPI Router (Render)
3. Router → UseCase（依存性注入）
4. UseCase → Repository（インターフェース経由）
5. Repository → Supabase API
6. Supabase → PostgreSQL + RLS検証
7. Response → Client
```

### 2. 依存性の流れ（依存性逆転の原則）
```
Router (依存) → UseCase (依存) → IRepository (インターフェース)
                                        ↑
                                        │ 実装
                                        │
                              SupabaseRepository (Infrastructure)
```

**ポイント**: UseCaseはインターフェース（`IRepository`）に依存し、具体的な実装（`SupabaseRepository`）には依存しない。これにより、テスト時にMock実装に差し替え可能。

### 3. Supabase RLS（Row Level Security）
```sql
-- 全データ公開読み取り（認証不要）
CREATE POLICY "Enable read access for all users"
ON public.works
FOR SELECT
USING (true);
```

## 非同期処理

### FastAPIの非同期サポート
- async/awaitベースのエンドポイント
- 非同期I/O操作（Supabase API）
- uvicornによる高性能ASGI実行

## エラーハンドリング

### 階層的なエラー処理
1. **ドメイン例外**: `domain/exceptions.py`（今回は未実装）
   - `EntityNotFoundException`: リソース未検出
   - `ValidationException`: バリデーションエラー

2. **FastAPI HTTPException**: Router層で発生
```python
from fastapi import HTTPException

@router.get("/works/{work_id}")
async def get_work_by_id(work_id: int, usecase: WorkUseCase = Depends(get_work_usecase)):
    work = await usecase.get_work_by_id(work_id)
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    return work
```

3. **グローバル例外ハンドラー**: `main.py`
```python
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )
```

## セキュリティアーキテクチャ

### データアクセス制御
1. **Supabase RLS**: PostgreSQLレベルでのアクセス制御
2. **環境変数**: 機密情報の分離（`.env`）
3. **CORS設定**: Frontend ↔ Backend通信の制限

### セキュリティ実装
- Supabase匿名キー（anon key）使用
- 公開読み取り専用データ（認証不要）
- XSS対策（Reactの自動エスケープ）
- SQLインジェクション対策（SupabaseクライアントORM）

## 拡張性とメンテナンス性

### モジュラー設計
- 機能単位でのモジュール分割（Works, Skills, About, Hero, Contact）
- 疎結合な実装（インターフェース駆動）
- 依存性の逆転（DIP: Dependency Inversion Principle）

### テスタビリティ
- リポジトリインターフェースによるMock差し替え
- DIによる依存性の注入
- 単体テストの容易性（各層を独立してテスト可能）

**テスト例**:
```python
# tests/test_work_usecase.py
from unittest.mock import AsyncMock
from app.usecase.work_usecase import WorkUseCase
from app.domain.entity.work import Work

async def test_get_all_works():
    # Arrange: Mock Repository
    mock_repository = AsyncMock()
    mock_repository.find_all.return_value = [
        Work(id=1, title="Test", description="Test", tech_stack=["Python"], order_index=1)
    ]
    usecase = WorkUseCase(repository=mock_repository)

    # Act
    works = await usecase.get_all_works()

    # Assert
    assert len(works) == 1
    assert works[0].title == "Test"
    mock_repository.find_all.assert_called_once()
```

### 監視とログ
- FastAPI自動生成APIドキュメント（`/docs`）
- ヘルスチェックエンドポイント（`/`）
- GitHub Actions CI/CDによる継続的監視

## デプロイアーキテクチャ

### Vercel（Frontend）
- Next.js 16専用プラットフォーム
- Edge Network（世界中のCDN）
- 自動プレビューデプロイ
- 環境変数管理

### Render（Backend）
- FastAPI Webサービス
- 自動スケーリング
- ヘルスチェック監視
- 環境変数管理

### Supabase（Database）
- PostgreSQL マネージドサービス
- 自動バックアップ
- REST API自動生成
- リアルタイム機能（未使用）

## パフォーマンス最適化

### Backend最適化
- 非同期I/O（async/await）
- Supabaseクライアントの再利用
- シンプルなクエリ設計（N+1問題なし）
- order_indexによるソート（インデックス使用）

### ネットワーク最適化
- Vercel Edge Caching
- HTTP/2サポート
- 圧縮（gzip/brotli）

## クリーンアーキテクチャの利点

### 1. テスト容易性
各層が独立しているため、単体テストが容易。リポジトリをMockに差し替えてUseCaseをテスト可能。

### 2. 技術的柔軟性
Supabase → PostgreSQL直接接続 → 別のDBへの切り替えが容易（リポジトリ実装を差し替えるだけ）。

### 3. ビジネスロジックの保護
ドメイン層（Entity, IRepository）は外部依存がないため、フレームワーク変更の影響を受けない。

### 4. 明確な責務分離
各層の役割が明確で、新規メンバーがコードを理解しやすい。

## 今後の拡張可能性

### 認証機能追加
```python
# domain/entity/user.py
class User(BaseModel):
    id: int
    email: str
    role: str

# domain/i_repository/i_user_repository.py
class IUserRepository(ABC):
    @abstractmethod
    async def find_by_email(self, email: str) -> User | None:
        pass

# usecase/auth_usecase.py
class AuthUseCase:
    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository

    async def authenticate(self, email: str, password: str) -> User:
        # 認証ロジック
        pass
```

### キャッシング機能追加
```python
# infra/repository/cached_work_repository.py
class CachedWorkRepository(IWorkRepository):
    def __init__(self, repository: IWorkRepository, cache: RedisClient):
        self.repository = repository
        self.cache = cache

    async def find_all(self) -> list[Work]:
        cached = await self.cache.get("works:all")
        if cached:
            return cached
        works = await self.repository.find_all()
        await self.cache.set("works:all", works, ttl=3600)
        return works
```

このように、インターフェース駆動設計により、既存コードを変更せずに新機能を追加可能。
