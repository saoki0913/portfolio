# データベース設計

## 概要
Supabase（PostgreSQL）を使用したRDBMS設計。すべてのテーブルには自動的に`id`（主キー）、`created_at`タイムスタンプが付与される。Row Level Security（RLS）により、アプリケーションレベルではなくデータベースレベルでのアクセス制御を実現。

## 主要テーブル（8テーブル）

### 1. ヒーローセクション

#### hero_introduction
ヒーローセクションの自己紹介テキスト（1レコード固定）
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- introduction_text: TEXT (NOT NULL) -- 自己紹介文
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
-- 全ユーザー読み取り可能
CREATE POLICY "Enable read access for all users"
ON public.hero_introduction
FOR SELECT
USING (true);
```

#### timeline_items
タイムライン項目（経歴の要約）
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- year: TEXT (NOT NULL) -- 年度（例: "2023"）
- title: TEXT (NOT NULL) -- タイトル
- description: TEXT (NOT NULL) -- 説明文
- order_index: INTEGER (NOT NULL) -- 表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.timeline_items
FOR SELECT
USING (true);
```

### 2. 作品紹介

#### works
ポートフォリオプロジェクト一覧
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- title: TEXT (NOT NULL) -- プロジェクト名
- description: TEXT (NOT NULL) -- 概要
- tech_stack: TEXT[] (NOT NULL) -- 使用技術（配列）
- github_url: TEXT (NULLABLE) -- GitHubリポジトリURL
- demo_url: TEXT (NULLABLE) -- デモサイトURL
- image_url: TEXT (NULLABLE) -- サムネイル画像URL
- order_index: INTEGER (NOT NULL) -- 表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.works
FOR SELECT
USING (true);
```

### 3. スキル

#### skills
技術スキル一覧（カテゴリ別）
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- name: TEXT (NOT NULL) -- スキル名（例: "Next.js"）
- category: TEXT (NOT NULL) -- カテゴリ（Frontend, Backend, Database, Infrastructure, Tools）
- level: INTEGER (NOT NULL) -- レベル（1-5）
- order_index: INTEGER (NOT NULL) -- カテゴリ内表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.skills
FOR SELECT
USING (true);
```

### 4. プロフィール

#### about
自己紹介（1レコード固定）
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- bio: TEXT (NOT NULL) -- 自己紹介文
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.about
FOR SELECT
USING (true);
```

#### education
学歴
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- institution: TEXT (NOT NULL) -- 学校名
- degree: TEXT (NOT NULL) -- 学位・専攻
- start_year: TEXT (NOT NULL) -- 開始年度
- end_year: TEXT (NULLABLE) -- 終了年度（在学中はNULL）
- order_index: INTEGER (NOT NULL) -- 表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.education
FOR SELECT
USING (true);
```

#### experience
職歴
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- company: TEXT (NOT NULL) -- 会社名
- position: TEXT (NOT NULL) -- 職位
- start_year: TEXT (NOT NULL) -- 開始年月
- end_year: TEXT (NULLABLE) -- 終了年月（在職中はNULL）
- description: TEXT (NOT NULL) -- 業務内容
- order_index: INTEGER (NOT NULL) -- 表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.experience
FOR SELECT
USING (true);
```

### 5. ソーシャルメディア

#### social_media
SNSリンク
```sql
- id: BIGINT (PK, AUTO_INCREMENT)
- platform: TEXT (NOT NULL) -- プラットフォーム名（GitHub, LinkedIn等）
- url: TEXT (NOT NULL) -- プロフィールURL
- order_index: INTEGER (NOT NULL) -- 表示順序
- created_at: TIMESTAMPTZ (DEFAULT: now())
```

**RLSポリシー**:
```sql
CREATE POLICY "Enable read access for all users"
ON public.social_media
FOR SELECT
USING (true);
```

## リレーションシップ

### 主要な関係性
このポートフォリオサイトではシンプルなデータモデルを採用しており、複雑なリレーションシップは存在しません。各テーブルは独立しており、`order_index`による表示順序制御のみを実装しています。

## インデックス戦略

### 主要インデックス
- **主キー**: 各テーブルの`id`カラム（自動生成）
- **表示順序**: `order_index`カラム（ソート高速化）
- **カテゴリ検索**: `skills.category`（カテゴリ別取得の高速化）

### インデックス作成例
```sql
-- スキルカテゴリ検索の高速化
CREATE INDEX idx_skills_category ON skills(category);

-- 表示順序ソートの高速化
CREATE INDEX idx_works_order ON works(order_index);
CREATE INDEX idx_timeline_order ON timeline_items(order_index);
```

## データ型とENUM

### PostgreSQL固有の型
- **TEXT**: 可変長文字列（制限なし）
- **TEXT[]**: テキスト配列（`tech_stack`に使用）
- **BIGINT**: 64bit整数（主キー）
- **INTEGER**: 32bit整数（`order_index`, `level`）
- **TIMESTAMPTZ**: タイムゾーン付きタイムスタンプ

### ENUMは使用せず、TEXT型で管理
- `skills.category`: "Frontend", "Backend", "Database", "Infrastructure", "Tools"
- `social_media.platform`: "GitHub", "LinkedIn", "Twitter"等

## Supabase特有の機能

### Row Level Security（RLS）
全テーブルで公開読み取り専用ポリシーを設定：

```sql
-- テーブル作成後、RLS有効化
ALTER TABLE public.hero_introduction ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;

-- 全ユーザー読み取り可能ポリシー
CREATE POLICY "Enable read access for all users"
ON public.[テーブル名]
FOR SELECT
USING (true);
```

### 自動生成API
Supabaseは各テーブルに対してREST APIを自動生成：

```bash
# 例: worksテーブルの全レコード取得
GET https://szzogbswbwbkszhwfjpe.supabase.co/rest/v1/works
Headers:
  apikey: [SUPABASE_ANON_KEY]
  Authorization: Bearer [SUPABASE_ANON_KEY]
```

### Supabase JavaScript Client
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 全作品取得
const { data, error } = await supabase
  .from('works')
  .select('*')
  .order('order_index', { ascending: true });
```

## マイグレーション

### Supabase SQLエディタ使用
1. Supabase Dashboard → SQL Editor
2. テーブル作成SQLを実行
3. RLSポリシーを設定
4. データ投入

### マイグレーションスクリプト例
```sql
-- works テーブル作成
CREATE TABLE IF NOT EXISTS public.works (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS有効化
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;

-- 読み取りポリシー
CREATE POLICY "Enable read access for all users"
ON public.works
FOR SELECT
USING (true);

-- インデックス作成
CREATE INDEX idx_works_order ON works(order_index);
```

## データ整合性

### 制約
- **主キー制約**: `id`カラム（自動生成）
- **NOT NULL制約**: 必須フィールド（`title`, `description`等）
- **配列型制約**: `tech_stack`は空配列も許可

### デフォルト値
- `created_at`: `now()`（挿入時の現在時刻）
- `id`: `GENERATED ALWAYS AS IDENTITY`（自動インクリメント）

## パフォーマンス最適化

### クエリ最適化
- `order_index`によるソート（インデックス使用）
- `category`によるフィルタリング（インデックス使用）
- シンプルなSELECT文（JOINなし）

### Supabaseの自動最適化
- コネクションプーリング
- クエリキャッシング
- 自動バキューム

## データ管理

### データ投入方法

#### 1. Supabase Table Editor（GUI）
Supabase Dashboard → Table Editor → Insert Row

#### 2. SQL INSERT文
```sql
INSERT INTO public.works (title, description, tech_stack, github_url, order_index)
VALUES ('サンプルプロジェクト', 'プロジェクトの説明', ARRAY['Next.js', 'FastAPI'], 'https://github.com/...', 1);
```

#### 3. Supabase JavaScript Client
```typescript
const { data, error } = await supabase
  .from('works')
  .insert([
    {
      title: 'サンプルプロジェクト',
      description: 'プロジェクトの説明',
      tech_stack: ['Next.js', 'FastAPI'],
      github_url: 'https://github.com/...',
      order_index: 1
    }
  ]);
```

## バックアップと復元

### Supabase自動バックアップ
- 毎日自動バックアップ（Pro Plan以上）
- Point-in-Time Recovery（PITR）対応
- 手動バックアップ（SQL Dumpダウンロード）

### バックアップ手順
1. Supabase Dashboard → Database → Backups
2. "Create Backup" → ダウンロード
3. PostgreSQL `pg_restore`で復元可能
