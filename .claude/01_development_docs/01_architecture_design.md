# アーキテクチャ設計

## 1. アーキテクチャ概要

### 1.1 全体構成

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                          │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│              Frontend (Next.js 15 App Router)                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  App Router Pages (/app)                               │  │
│  │  - page.tsx (Home)                                     │  │
│  │  - works/[id]/page.tsx (Work Detail)                   │  │
│  │  - layout.tsx (Root Layout)                            │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Server Components (Default)                           │  │
│  │  - Hero, About, Skills, Works sections                 │  │
│  │  - Data fetching at build/request time                 │  │
│  │  - SEO-optimized HTML generation                       │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Client Components ('use client')                      │  │
│  │  - ContactForm (React Hook Form + Zod)                 │  │
│  │  - Animations (Framer Motion)                          │  │
│  │  - Interactive UI elements                             │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API Client Layer (/lib/api)                           │  │
│  │  - Axios instance with interceptors                    │  │
│  │  - Type-safe API functions                             │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                  Backend (FastAPI)                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  API Layer (/app/api)                                  │  │
│  │  - Route handlers (works, skills, about, hero, contact)│  │
│  │  - Request validation (Pydantic)                       │  │
│  │  - CORS middleware                                     │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Schema Layer (/app/schemas)                           │  │
│  │  - Pydantic models (Request/Response)                  │  │
│  │  - Type validation and serialization                   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Database Access Layer (/app/database.py)              │  │
│  │  - Supabase client                                     │  │
│  │  - Mock data fallback                                  │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ Supabase SDK
┌─────────────────────────────────────────────────────────────┐
│              Database (Supabase PostgreSQL)                  │
│  - works, work_technologies, screenshots                    │
│  - skills, skill_categories                                 │
│  - abouts, educations, experiences, social_media            │
│  - hero_introduction, timeline_items                        │
│  - contact_messages                                         │
└─────────────────────────────────────────────────────────────┘
                          ↓ SMTP
┌─────────────────────────────────────────────────────────────┐
│                  External Services                           │
│  - Gmail SMTP (Contact form emails)                         │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 設計思想

**レイヤード・アーキテクチャ + 関心の分離**

1. **フロントエンド**: Server Components優先、必要な部分のみClient Components
2. **バックエンド**: RESTful API、Pydanticによる型安全性
3. **データベース**: Supabase（PostgreSQL）、Mock Mode対応
4. **型の一致**: TypeScript ↔ Pydantic で厳密な型同期

---

## 2. フロントエンド・アーキテクチャ

### 2.1 Next.js 15 App Router

#### ディレクトリ構造

```
frontend/src/
├── app/                          # App Router（ファイルシステムルーティング）
│   ├── layout.tsx               # ルートレイアウト（メタデータ、フォント）
│   ├── page.tsx                 # ホームページ（全セクション統合）
│   ├── globals.css              # グローバルCSS（Tailwind CSS）
│   └── works/
│       └── [id]/
│           └── page.tsx         # 動的ルート（作品詳細）
├── components/                   # コンポーネント
│   ├── ui/                      # 汎用UIコンポーネント（Radix UI ベース）
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── animated-counter.tsx
│   │   ├── tilt-card.tsx
│   │   └── section-divider.tsx
│   ├── sections/                # ページセクションコンポーネント
│   │   ├── Header.tsx           # ナビゲーションヘッダー
│   │   ├── Hero.tsx             # ヒーローセクション（Server Component）
│   │   ├── About.tsx            # プロフィールセクション（Server Component）
│   │   ├── Skills.tsx           # スキルセクション（Server Component）
│   │   ├── Works.tsx            # 作品一覧セクション（Server Component）
│   │   ├── Contact.tsx          # コンタクトセクション
│   │   ├── Footer.tsx           # フッター
│   │   └── ContactForm.tsx      # コンタクトフォーム（Client Component）
│   ├── project-detail-layout.tsx # 作品詳細レイアウト
│   └── cursor-glow.tsx          # カーソルグロー効果（Client Component）
├── lib/                          # ユーティリティ・ロジック
│   ├── api/                     # APIクライアント
│   │   ├── client.ts            # Axiosインスタンス
│   │   ├── works.ts
│   │   ├── skills.ts
│   │   ├── about.ts
│   │   ├── hero.ts
│   │   └── contact.ts
│   ├── types/                   # TypeScript型定義
│   │   ├── work.ts
│   │   ├── skill.ts
│   │   ├── about.ts
│   │   └── contact.ts
│   ├── utils.ts                 # 汎用ユーティリティ（cn関数など）
│   └── animation-utils.ts       # アニメーションヘルパー
└── hooks/                        # カスタムフック
    └── use-mobile.tsx           # モバイル判定フック
```

#### Server Components vs Client Components

**Server Components（デフォルト）**
- Hero, About, Skills, Works セクション
- layout.tsx, page.tsx
- データフェッチングを含むコンポーネント

**利点**:
- サーバーサイドでHTMLを生成（SEO最適化）
- JavaScriptバンドルサイズの削減
- 初回ロードの高速化

**Client Components ('use client')**
- ContactForm（React Hook Form）
- Framer Motion を使用するアニメーション
- イベントハンドラー（onClick, onChange等）を使用するコンポーネント

**利点**:
- インタラクティブなUI
- ブラウザAPIアクセス（localStorage, window等）

### 2.2 データフェッチング戦略

#### パターン1: Server Componentでの直接フェッチ

```typescript
// app/page.tsx (Server Component)
import { getSkills } from '@/lib/api/skills';

export default async function Home() {
  const skillsData = await getSkills();

  return (
    <>
      <Hero />
      <Skills skills={skillsData} />
      {/* ... */}
    </>
  );
}
```

#### パターン2: Client Componentでの状態管理フェッチ

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getWorks } from '@/lib/api/works';

export default function WorksClient() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    getWorks().then(setWorks);
  }, []);

  return <WorksList works={works} />;
}
```

**推奨**: 可能な限りServer Componentでフェッチ（SEO、パフォーマンス優位）

### 2.3 状態管理方針

**基本方針**: Server Components中心のため、グローバル状態管理ライブラリ（Redux, Zustand）は不使用

- **フォーム状態**: React Hook Form（ContactForm）
- **アニメーション状態**: Framer Motion内部管理
- **ローカル状態**: useState（Client Componentsのみ）
- **サーバー状態**: Server Componentsで直接フェッチ

---

## 3. バックエンド・アーキテクチャ

### 3.1 FastAPI 構造

#### ディレクトリ構造

```
backend/app/
├── main.py                      # アプリケーションエントリーポイント
│                                 # - FastAPIインスタンス作成
│                                 # - CORSミドルウェア設定
│                                 # - ルーター登録
├── database.py                  # データベース接続
│                                 # - Supabaseクライアント
│                                 # - get_db依存性
│                                 # - Mock Mode対応
├── core/
│   └── config.py                # 設定管理
│                                 # - Pydantic Settings
│                                 # - 環境変数読み込み
├── api/                          # APIルーター
│   ├── works.py                 # 作品API
│   ├── skills.py                # スキルAPI
│   ├── about.py                 # プロフィールAPI
│   ├── hero.py                  # ヒーローセクションAPI
│   └── contact.py               # コンタクトAPI
└── schemas/                      # Pydanticスキーマ
    ├── work.py                  # 作品スキーマ
    ├── skill.py                 # スキルスキーマ
    ├── about.py                 # プロフィールスキーマ
    ├── hero.py                  # ヒーローセクションスキーマ
    └── contact.py               # コンタクトスキーマ
```

### 3.2 レイヤー責務

#### 1. API Layer (`/api/*.py`)

**責務**:
- HTTPリクエストの受け付け
- ルーティング（`@router.get`, `@router.post`）
- Pydanticによるバリデーション
- レスポンス生成

**例**:
```python
# app/api/works.py
@router.get("", response_model=WorkListResponse)
def get_all_works(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA or supabase is None:
        return MOCK_WORKS_DATA

    works_response = supabase.table("works").select("*").execute()
    # ... データ整形
    return {"works": works}
```

#### 2. Schema Layer (`/schemas/*.py`)

**責務**:
- リクエスト/レスポンスの型定義
- データバリデーション
- シリアライゼーション

**例**:
```python
# app/schemas/work.py
class Work(WorkBase):
    id: str
    technologies: List[str]
    screenshots: List[Screenshot] = []
    links: Optional[WorkLinks] = None

    class Config:
        orm_mode = True
```

#### 3. Database Access Layer (`database.py`)

**責務**:
- Supabaseクライアント初期化
- 依存性注入（`get_db`）
- Mock Mode対応

**例**:
```python
# app/database.py
supabase: Optional[Client] = None

if settings.SUPABASE_URL and settings.SUPABASE_KEY:
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def get_db():
    # 依存性注入用
    yield supabase
```

### 3.3 Mock Mode設計

**目的**: データベース未接続時でもフロントエンド開発を可能にする

**実装パターン**:
```python
@router.get("", response_model=SkillListResponse)
def get_all_skills(db: Session = Depends(get_db)):
    # Mock Modeチェック
    if settings.USE_MOCK_DATA or supabase is None:
        return MOCK_SKILLS_DATA

    try:
        # Supabaseからデータ取得
        response = supabase.table("skill_categories").select("*").execute()
        # ...
        return {"categories": categories}
    except Exception as e:
        # エラー時もMockデータフォールバック
        return MOCK_SKILLS_DATA
```

**環境変数**:
```bash
USE_MOCK_DATA=True  # Mock Mode有効化
```

---

## 4. データベース・アーキテクチャ

### 4.1 Supabase（PostgreSQL）

**選定理由**:
- PostgreSQL（信頼性の高いRDB）
- 認証・ストレージ統合
- リアルタイムサブスクリプション（将来拡張）
- 自動生成されるREST API

### 4.2 データアクセスパターン

**Supabase Python Client使用**:
```python
# SELECT
works = supabase.table("works").select("*").execute()

# SELECT with filter
work = supabase.table("works").select("*").eq("id", work_id).single().execute()

# INSERT
supabase.table("contact_messages").insert({
    "name": "...",
    "email": "..."
}).execute()

# JOIN（手動実装）
work = supabase.table("works").select("*").eq("id", work_id).single().execute()
technologies = supabase.table("work_technologies").select("technology").eq("work_id", work_id).execute()
work["technologies"] = [t["technology"] for t in technologies.data]
```

---

## 5. API設計パターン

### 5.1 RESTful原則

| メソッド | パス | 用途 |
|---------|------|------|
| GET | `/works` | 全作品取得 |
| GET | `/works/{id}` | 作品詳細取得 |
| GET | `/skills` | 全スキル取得 |
| GET | `/about` | プロフィール取得 |
| POST | `/contact` | お問い合わせ送信 |

### 5.2 エンドポイント命名規則

- **複数形リソース**: `/works`, `/skills`
- **単数形アクション**: `/contact`（送信アクション）
- **ネスト**: `/hero/introduction`, `/hero/timeline`（サブリソース）

### 5.3 レスポンス形式

**成功時**:
```json
{
  "works": [...]
}
```

**エラー時**:
```json
{
  "detail": "エラーメッセージ"
}
```

---

## 6. 型システム設計

### 6.1 TypeScript ↔ Pydantic 型同期

**重要原則**: フロントエンドとバックエンドで型定義を厳密に一致させる

#### Backend (Pydantic)
```python
# app/schemas/work.py
class Work(BaseModel):
    id: str
    title: str
    description: str
    thumbnail: str
    category: Optional[str] = None
    technologies: List[str]
    screenshots: List[Screenshot] = []
    links: Optional[WorkLinks] = None
```

#### Frontend (TypeScript)
```typescript
// src/lib/types/work.ts
export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category?: string;
  technologies: string[];
  screenshots: Screenshot[];
  links?: WorkLinks;
}
```

**同期方法**:
1. `07_type_definitions.md`でマスター型定義を管理
2. 変更時は両方の型を同時更新
3. レビュー時に型の一致を確認

---

## 7. 認証・認可（将来拡張）

**現状**: 認証不要（ポートフォリオは公開情報）

**将来（Phase 2）**:
- Supabase Auth統合
- 管理画面でのコンテンツ編集
- JWT ベース認証

---

## 8. セキュリティ・アーキテクチャ

### 8.1 CORS設定

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

**本番環境**: `allow_origins`を本番ドメインに制限

### 8.2 入力検証

- **フロントエンド**: Zod（React Hook Form統合）
- **バックエンド**: Pydantic（自動バリデーション）

### 8.3 SQLインジェクション対策

- Supabase Clientのパラメータ化クエリ（自動エスケープ）

---

## 9. パフォーマンス・アーキテクチャ

### 9.1 Server Components活用

- 初回HTML生成でコンテンツ表示（FCP改善）
- JavaScriptバンドル削減（TTI改善）

### 9.2 画像最適化

- `next/image`コンポーネント使用
- WebP/AVIF変換
- レスポンシブ画像（srcset）

### 9.3 コード分割

- App Routerの自動コード分割
- 動的インポート（`lazy`）

---

## 10. エラーハンドリング・アーキテクチャ

### 10.1 フロントエンド

```typescript
// src/lib/api/client.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      // 404エラーハンドリング
    }
    return Promise.reject(error);
  }
);
```

### 10.2 バックエンド

```python
# app/api/works.py
@router.get("/{work_id}")
def get_work_by_id(work_id: str):
    try:
        work = supabase.table("works").select("*").eq("id", work_id).single().execute()
        if not work.data:
            raise HTTPException(status_code=404, detail="作品が見つかりません")
        return work.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

詳細は `06_error_handling_design.md` を参照。

---

## 11. デプロイ・アーキテクチャ

### 11.1 環境分離

| 環境 | Frontend | Backend | Database |
|------|----------|---------|----------|
| 開発 | localhost:3000 | localhost:8000 | Supabase Dev |
| 本番 | Vercel | Render/Railway | Supabase Prod |

### 11.2 環境変数管理

- 開発: `.env`, `.env.local`
- 本番: Vercel/Render環境変数設定

---

## 12. アーキテクチャ決定記録（ADR）

### ADR-001: Next.js App Router採用

**決定**: Next.js 15 App Router使用

**理由**:
- Server Components による SEO最適化
- ファイルシステムベースルーティング
- 段階的な静的生成（ISR）

**トレードオフ**: Pages Routerより学習コストが高い

---

### ADR-002: Supabase採用

**決定**: Supabase（PostgreSQL）をBaaSとして採用

**理由**:
- PostgreSQLの信頼性
- 認証・ストレージ統合
- Mock Mode対応で開発柔軟性

**トレードオフ**: ベンダーロックインリスク

---

### ADR-003: TypeScript + Pydantic 型同期

**決定**: フロントエンド（TypeScript）とバックエンド（Pydantic）で型定義を厳密に同期

**理由**:
- 型安全性の担保
- バグの早期発見
- リファクタリングの容易性

**トレードオフ**: 型定義の二重管理（手動同期が必要）

---

## 13. まとめ

このアーキテクチャ設計は、以下の原則に基づく:

1. **Server Components優先** - SEO、パフォーマンス最適化
2. **型安全性の徹底** - TypeScript ↔ Pydantic 同期
3. **関心の分離** - レイヤード・アーキテクチャ
4. **Mock Mode対応** - 開発柔軟性
5. **スケーラビリティ** - 将来の拡張を見据えた設計

各レイヤーの責務を明確にし、一貫性のある高品質なポートフォリオサイトを実現する。
