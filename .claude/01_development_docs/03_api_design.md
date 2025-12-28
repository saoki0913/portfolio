# API設計

## 1. API概要

### 1.1 基本情報

| 項目 | 内容 |
|------|------|
| APIスタイル | RESTful API |
| プロトコル | HTTP/HTTPS |
| データ形式 | JSON |
| 認証 | なし（公開ポートフォリオ） |
| バージョニング | パスベース（将来的に `/v1` など） |

### 1.2 Base URL

| 環境 | Base URL |
|------|----------|
| 開発 | `http://localhost:8000` |
| 本番 | `https://api.portfolio.com`（TBD） |

### 1.3 APIプレフィックス

```python
# backend/app/core/config.py
API_PREFIX = ""  # 現在はプレフィックスなし
```

全エンドポイントは `/works`, `/skills` のように直接アクセス。

---

## 2. エンドポイント一覧

### 2.1 全エンドポイント概要

| Method | Path | 説明 | 認証 | レスポンス |
|--------|------|------|------|-----------|
| GET | `/` | API ヘルスチェック | 不要 | `{"message": "Welcome to Portfolio API"}` |
| GET | `/works` | 全作品一覧取得 | 不要 | WorkListResponse |
| GET | `/works/{work_id}` | 作品詳細取得 | 不要 | Work |
| GET | `/skills` | 全スキル取得（カテゴリ別） | 不要 | SkillListResponse |
| GET | `/skills/categories` | スキルカテゴリ名一覧 | 不要 | List[str] |
| GET | `/about` | プロフィール情報取得 | 不要 | About |
| GET | `/hero/introduction` | ヒーロー自己紹介取得 | 不要 | List[HeroIntroduction] |
| GET | `/hero/timeline` | タイムライン取得 | 不要 | List[TimelineItem] |
| POST | `/contact` | お問い合わせ送信 | 不要 | ContactResponse |

---

## 3. エンドポイント詳細

### 3.1 ヘルスチェック

#### `GET /`

**説明**: APIサーバーの稼働確認

**リクエスト**: なし

**レスポンス**:
```json
{
  "message": "Welcome to Portfolio API"
}
```

**ステータスコード**:
- `200 OK`

---

### 3.2 Works API

#### `GET /works`

**説明**: 全作品一覧を取得

**リクエストパラメータ**: なし

**レスポンス**:
```json
{
  "works": [
    {
      "id": "work-1",
      "title": "Portfolio Website",
      "description": "モダンなポートフォリオサイト。Next.js 15、Tailwind CSS、Framer Motionを使用。",
      "thumbnail": "/works/portfolio.png",
      "category": "Web Development",
      "duration": "2024.12 - 2025.01",
      "role": "フルスタック開発",
      "learnings": "Next.js 15 App Routerの実践的な習得",
      "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI"],
      "screenshots": [],
      "links": {
        "github": "https://github.com/shunsuke-aoki/portfolio",
        "demo": null,
        "blog": null
      }
    }
  ]
}
```

**ステータスコード**:
- `200 OK`

**エラーレスポンス**:
- `500 Internal Server Error`: サーバーエラー時、Mock Dataフォールバック

---

#### `GET /works/{work_id}`

**説明**: 特定作品の詳細情報を取得

**パスパラメータ**:
- `work_id` (string, required): 作品ID（例: "work-1"）

**レスポンス**:
```json
{
  "id": "work-1",
  "title": "Portfolio Website",
  "description": "モダンなポートフォリオサイト。Next.js 15、Tailwind CSS、Framer Motionを使用。",
  "thumbnail": "/works/portfolio.png",
  "category": "Web Development",
  "duration": "2024.12 - 2025.01",
  "role": "フルスタック開発",
  "learnings": "Next.js 15 App Routerの実践的な習得、型安全性の重要性",
  "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI"],
  "screenshots": [
    {
      "id": 1,
      "url": "/works/portfolio-screenshot-1.png",
      "caption": "ホームページ全体像"
    }
  ],
  "links": {
    "github": "https://github.com/shunsuke-aoki/portfolio",
    "demo": "https://portfolio.vercel.app",
    "blog": null
  }
}
```

**ステータスコード**:
- `200 OK`: 成功
- `404 Not Found`: 作品が見つからない
- `500 Internal Server Error`: サーバーエラー

**エラーレスポンス**:
```json
{
  "detail": "作品が見つかりません"
}
```

---

### 3.3 Skills API

#### `GET /skills`

**説明**: 全スキルをカテゴリ別に取得

**クエリパラメータ**:
- `category` (string, optional): カテゴリ名でフィルタリング（例: "Languages"）

**レスポンス**:
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Languages",
      "skills": [
        {
          "id": 1,
          "name": "Python",
          "level": 90,
          "icon": null,
          "description": null,
          "category": "Languages"
        },
        {
          "id": 2,
          "name": "JavaScript",
          "level": 85,
          "icon": null,
          "description": null,
          "category": "Languages"
        }
      ]
    },
    {
      "id": 2,
      "name": "Frameworks",
      "skills": [
        {
          "id": 5,
          "name": "FastAPI",
          "level": 90,
          "icon": null,
          "description": null,
          "category": "Frameworks"
        }
      ]
    }
  ]
}
```

**ステータスコード**:
- `200 OK`

---

#### `GET /skills/categories`

**説明**: スキルカテゴリ名の一覧を取得

**レスポンス**:
```json
["Languages", "Frameworks", "Tools & Cloud"]
```

**ステータスコード**:
- `200 OK`

---

### 3.4 About API

#### `GET /about`

**説明**: プロフィール情報（学歴・職歴・SNS含む）を取得

**レスポンス**:
```json
{
  "id": "default",
  "name": "Shunsuke Aoki",
  "title": "Robotics Researcher & Developer",
  "summary": "早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。",
  "profile_image": "/profile.jpg",
  "bio": "プログラミングとAIに情熱を持つエンジニアです。",
  "education": [
    {
      "id": "edu-1",
      "institution": "早稲田大学",
      "degree": "修士",
      "field": "創造理工学研究科 総合機械工学専攻",
      "start_date": "2025.4",
      "end_date": "現在",
      "description": "菅野研究室 認知ロボティクス研究。"
    }
  ],
  "experience": [
    {
      "id": "exp-1",
      "company": "株式会社インテリジェントフォース",
      "position": "AIエンジニア",
      "start_date": "2024.10",
      "end_date": "現在",
      "description": "Azure を活用したWebアプリの開発に従事。",
      "achievements": ["自然言語処理モデルの実装と改良", "APIの設計と開発"]
    }
  ],
  "social_media": [
    {
      "id": "social-1",
      "platform": "GitHub",
      "url": "https://github.com/shunsuke-aoki",
      "username": "shunsuke-aoki"
    }
  ]
}
```

**ステータスコード**:
- `200 OK`
- `404 Not Found`: プロフィール情報が見つからない

---

### 3.5 Hero API

#### `GET /hero/introduction`

**説明**: ヒーローセクションの自己紹介テキストを取得

**レスポンス**:
```json
[
  {
    "id": "default",
    "content": "早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。また、長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。"
  }
]
```

**ステータスコード**:
- `200 OK`

---

#### `GET /hero/timeline`

**説明**: タイムラインアイテムを取得（ソート順序付き）

**レスポンス**:
```json
[
  {
    "id": "default-1",
    "period": "2018.4 - 2021.3",
    "title": "早稲田高等学校",
    "subtitle": null,
    "sort_order": 1
  },
  {
    "id": "default-2",
    "period": "2021.4 - 2024.3",
    "title": "早稲田大学 創造理工学部 総合機械工学科",
    "subtitle": "学士課程",
    "sort_order": 2
  }
]
```

**ステータスコード**:
- `200 OK`

---

### 3.6 Contact API

#### `POST /contact`

**説明**: お問い合わせメッセージを送信

**リクエストボディ**:
```json
{
  "name": "山田太郎",
  "email": "taro@example.com",
  "subject": "お仕事の相談",
  "message": "はじめまして。貴殿のポートフォリオを拝見し、ぜひお話しさせていただきたく..."
}
```

**バリデーション**:
- `name`: 必須、文字列
- `email`: 必須、メール形式（Pydantic EmailStr）
- `subject`: 必須、文字列
- `message`: 必須、文字列

**レスポンス**:
```json
{
  "success": true,
  "message": "お問い合わせを受け付けました。ありがとうございます。"
}
```

**ステータスコード**:
- `200 OK`: 送信成功
- `422 Unprocessable Entity`: バリデーションエラー
- `500 Internal Server Error`: サーバーエラー

**エラーレスポンス（バリデーション）**:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

**内部処理**:
1. BackgroundTasksでメール送信（SMTP）
2. Supabaseへ履歴保存（オプション、`USE_MOCK_DATA=False`時）
3. 即座にレスポンス返却

---

## 4. 共通仕様

### 4.1 リクエストヘッダー

```http
Content-Type: application/json
Accept: application/json
```

### 4.2 レスポンス形式

**成功時**:
```json
{
  "data_key": { ... }
}
```

**エラー時**:
```json
{
  "detail": "エラーメッセージ"
}
```

または

```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "エラー詳細",
      "type": "error_type"
    }
  ]
}
```

### 4.3 HTTPステータスコード

| コード | 意味 | 使用例 |
|-------|------|--------|
| 200 | OK | 成功 |
| 404 | Not Found | リソース未発見 |
| 422 | Unprocessable Entity | バリデーションエラー |
| 500 | Internal Server Error | サーバーエラー |

### 4.4 CORS設定

```python
# backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 開発環境
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**本番環境**: `allow_origins`を本番ドメインのみに制限

---

## 5. エラーハンドリング

### 5.1 エラーレスポンス標準化

すべてのエラーは FastAPI の `HTTPException` を使用:

```python
from fastapi import HTTPException

raise HTTPException(status_code=404, detail="作品が見つかりません")
```

### 5.2 Mock Dataフォールバック

```python
@router.get("", response_model=WorkListResponse)
def get_all_works(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA or supabase is None:
        return MOCK_WORKS_DATA

    try:
        # Supabaseからデータ取得
        works_response = supabase.table("works").select("*").execute()
        return {"works": works}
    except Exception as e:
        # エラー時もMockデータ返却
        return MOCK_WORKS_DATA
```

詳細は `06_error_handling_design.md` を参照。

---

## 6. バリデーション

### 6.1 Pydantic スキーマ

すべてのリクエスト/レスポンスはPydanticモデルで定義:

```python
# app/schemas/contact.py
from pydantic import BaseModel, EmailStr

class ContactRequest(BaseModel):
    name: str
    email: EmailStr  # 自動メール形式バリデーション
    subject: str
    message: str
```

### 6.2 自動バリデーションエラー

FastAPIが自動的にバリデーションエラーを422レスポンスで返却:

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

---

## 7. API ドキュメント

### 7.1 自動生成ドキュメント

FastAPI は OpenAPI（Swagger）ドキュメントを自動生成:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

### 7.2 ドキュメント例

```python
# app/main.py
app = FastAPI(
    title="Portfolio API",
    description="ポートフォリオサイト用のRESTful API",
    version="1.0.0"
)
```

---

## 8. レート制限（将来実装）

**現状**: レート制限なし（公開ポートフォリオのため）

**Phase 2**: Contact APIにレート制限導入
- 1分間に5リクエストまで（同一IPアドレス）
- スパム対策

---

## 9. キャッシング戦略（将来実装）

**現状**: キャッシングなし（Server Components でビルド時フェッチ）

**Phase 2**:
- Redis導入
- `/works`, `/skills`, `/about` などの GET エンドポイントをキャッシュ
- TTL: 1時間

---

## 10. バージョニング戦略

**現状**: バージョニングなし

**Phase 2**: パスベースバージョニング
- `/v1/works`
- `/v2/works`

**移行戦略**:
1. 新バージョンAPI作成（`/v2`）
2. 旧バージョン非推奨警告（Deprecation Warning）
3. 6ヶ月後に旧バージョン廃止

---

## 11. APIクライアント実装（フロントエンド）

### 11.1 Axiosインスタンス

```typescript
// frontend/src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// インターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 11.2 型安全なAPI関数

```typescript
// frontend/src/lib/api/works.ts
import apiClient from './client';
import type { WorkListResponse, Work } from '@/lib/types/work';

export async function getWorks(): Promise<WorkListResponse> {
  const response = await apiClient.get<WorkListResponse>('/works');
  return response.data;
}

export async function getWorkById(id: string): Promise<Work> {
  const response = await apiClient.get<Work>(`/works/${id}`);
  return response.data;
}
```

---

## 12. テスト戦略

### 12.1 エンドポイントテスト（Pytest）

```python
# tests/test_works_api.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_works():
    response = client.get("/works")
    assert response.status_code == 200
    assert "works" in response.json()

def test_get_work_by_id():
    response = client.get("/works/work-1")
    assert response.status_code == 200
    assert response.json()["id"] == "work-1"

def test_get_work_not_found():
    response = client.get("/works/nonexistent")
    assert response.status_code == 404
```

詳細は `09_test_strategy.md` を参照。

---

## 13. まとめ

このAPI設計は、以下の原則に基づく:

1. **RESTful原則の遵守**: リソース指向、適切なHTTPメソッド
2. **型安全性**: Pydantic スキーマによる自動バリデーション
3. **エラーハンドリング**: 統一されたエラーレスポンス
4. **Mock Mode対応**: 開発柔軟性
5. **自動ドキュメント生成**: FastAPI OpenAPI統合

型定義の詳細は `07_type_definitions.md`、エラーハンドリングは `06_error_handling_design.md` を参照。
