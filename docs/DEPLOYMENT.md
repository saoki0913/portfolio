# デプロイメント

## 概要
Vercel（フロントエンド）とRender（バックエンド）を使用したモダンなサーバーレス/コンテナデプロイメント。GitHub Actionsによる継続的な監視と自動デプロイ確認を実現。

## 環境構成

### 環境一覧
- **開発環境 (local)**: ローカル開発サーバー
- **本番環境 (production)**: Vercel + Render

### ブランチ戦略
- `main`: 本番環境へ自動デプロイ（Vercel/Render）
- `feature/*`: 開発ブランチ（PRでマージ）

## ローカル開発環境

### 初期セットアップ
```bash
# リポジトリクローン
git clone https://github.com/saoki0913/portfolio.git
cd portfolio

# フロントエンド環境変数設定
cd frontend
cp .env.example .env.local
# .env.localにNEXT_PUBLIC_API_URLを設定

# フロントエンド依存関係インストール
npm install

# バックエンド環境変数設定
cd ../backend
cp .env.example .env
# .envにSUPABASE_URL, SUPABASE_KEYを設定

# バックエンド仮想環境作成
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### ローカル起動
```bash
# ターミナル1: バックエンド起動
cd backend
source venv/bin/activate
uvicorn src.main:app --reload --port 8000
# → http://localhost:8000/docs (Swagger UI)

# ターミナル2: フロントエンド起動
cd frontend
npm run dev
# → http://localhost:3000
```

## Vercel（フロントエンド）デプロイ

### 初回セットアップ

#### 1. Vercelプロジェクト作成
```bash
# Vercel CLIインストール（オプション）
npm install -g vercel

# Vercel プロジェクト作成
cd frontend
vercel
```

または、Vercel Dashboardから:
1. https://vercel.com/new
2. GitHubリポジトリを接続: `saoki0913/portfolio`
3. Root Directory: `frontend`
4. Framework Preset: Next.js
5. Build Command: `npm run build`
6. Output Directory: `.next`

#### 2. 環境変数設定
Vercel Dashboard → Settings → Environment Variables:
```bash
NEXT_PUBLIC_API_URL=https://portfolio-backend-rf8v.onrender.com
```

#### 3. デプロイ設定
- **Production Branch**: `main`
- **Auto Deploy**: Enabled
- **Preview Deployments**: Enabled（PRごとにプレビューURL生成）

### デプロイ手順
```bash
# mainブランチへのpushで自動デプロイ
git push origin main

# または手動デプロイ
cd frontend
vercel --prod
```

### デプロイURL
- **本番**: https://portfolio-frontend-saoki0913s-projects.vercel.app
- **プレビュー**: PR作成時に自動生成

### Vercel特有の設定

#### Next.js 16対応
```json
// frontend/package.json
{
  "engines": {
    "node": ">=20.9.0"
  }
}
```

#### Vercel設定ファイル（vercel.json、オプション）
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

## Render（バックエンド）デプロイ

### 初回セットアップ

#### 1. Renderサービス作成
1. https://dashboard.render.com/
2. "New" → "Web Service"
3. GitHubリポジトリを接続: `saoki0913/portfolio`
4. 設定:
   - **Name**: `portfolio-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free（または Starter）

#### 2. 環境変数設定
Render Dashboard → Environment:
```bash
SUPABASE_URL=https://szzogbswbwbkszhwfjpe.supabase.co
SUPABASE_KEY=your_supabase_anon_key
PYTHON_VERSION=3.11.11
```

#### 3. ヘルスチェック設定
- **Health Check Path**: `/`
- **Expected Status**: 200

### デプロイ手順
```bash
# mainブランチへのpushで自動デプロイ
git push origin main

# 手動デプロイ（Render Dashboard）
# Deploy → Manual Deploy → "Deploy latest commit"
```

### デプロイURL
- **本番**: https://portfolio-backend-rf8v.onrender.com
- **APIドキュメント**: https://portfolio-backend-rf8v.onrender.com/docs

### Render特有の設定

#### requirements.txt
```txt
fastapi==0.95.1
uvicorn[standard]==0.22.0
pydantic==2.5.0
supabase==2.11.0
httpx==0.27.0
python-dotenv==1.0.0
```

#### render.yaml（オプション、Infrastructure as Code）
```yaml
services:
  - type: web
    name: portfolio-backend
    runtime: python
    region: oregon
    plan: free
    branch: main
    rootDir: backend
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn src.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_KEY
        sync: false
    healthCheckPath: /
```

## Supabase（データベース）設定

### 初回セットアップ

#### 1. Supabaseプロジェクト作成
1. https://supabase.com/dashboard
2. "New Project"
3. 設定:
   - **Organization**: 個人アカウント
   - **Name**: portfolio
   - **Database Password**: 自動生成
   - **Region**: Northeast Asia (Seoul)

#### 2. テーブル作成
Supabase Dashboard → SQL Editor → 以下のSQLを実行:

```sql
-- 1. hero_introduction テーブル
CREATE TABLE IF NOT EXISTS public.hero_introduction (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  introduction_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.hero_introduction ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.hero_introduction FOR SELECT USING (true);

-- 2. timeline_items テーブル
CREATE TABLE IF NOT EXISTS public.timeline_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.timeline_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.timeline_items FOR SELECT USING (true);

-- 3. works テーブル
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

ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.works FOR SELECT USING (true);

CREATE INDEX idx_works_order ON works(order_index);

-- 4. skills テーブル
CREATE TABLE IF NOT EXISTS public.skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.skills FOR SELECT USING (true);

CREATE INDEX idx_skills_category ON skills(category);

-- 5. about テーブル
CREATE TABLE IF NOT EXISTS public.about (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bio TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.about FOR SELECT USING (true);

-- 6. education テーブル
CREATE TABLE IF NOT EXISTS public.education (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  start_year TEXT NOT NULL,
  end_year TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.education FOR SELECT USING (true);

-- 7. experience テーブル
CREATE TABLE IF NOT EXISTS public.experience (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  start_year TEXT NOT NULL,
  end_year TEXT,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.experience FOR SELECT USING (true);

-- 8. social_media テーブル
CREATE TABLE IF NOT EXISTS public.social_media (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON public.social_media FOR SELECT USING (true);
```

#### 3. API認証情報取得
Supabase Dashboard → Settings → API:
- **Project URL**: `https://szzogbswbwbkszhwfjpe.supabase.co`
- **anon public key**: `eyJhbG...`（匿名公開キー）

この情報を環境変数として設定:
- Backend（Render）: `SUPABASE_URL`, `SUPABASE_KEY`
- Frontend（Vercel）: 使用しない（BackendがSupabase接続）

## CI/CDパイプライン

### GitHub Actions ワークフロー
ファイル: `.github/workflows/ci-cd.yml`

#### トリガー
- `push` to `main`ブランチ
- `pull_request` to `main`ブランチ

#### ジョブ構成
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  RENDER_BACKEND_URL: https://portfolio-backend-rf8v.onrender.com
  VERCEL_FRONTEND_URL: https://portfolio-frontend-saoki0913s-projects.vercel.app

jobs:
  backend-test:
    name: 🐍 Backend Test & Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        working-directory: ./backend
        run: pip install -r requirements.txt
      - name: Run Flake8
        working-directory: ./backend
        run: |
          pip install flake8
          flake8 src/ --count --max-line-length=120
      - name: Start FastAPI server
        working-directory: ./backend
        run: |
          uvicorn src.main:app &
          sleep 10
          curl http://localhost:8000/

  frontend-test:
    name: ⚛️ Frontend Test & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      - name: Run TypeScript type check
        working-directory: ./frontend
        run: npm run tsc --noEmit
      - name: Build Next.js app
        working-directory: ./frontend
        run: npm run build

  deploy-verification:
    name: 🚀 Deployment Verification
    needs: [backend-test, frontend-test]
    runs-on: ubuntu-latest
    steps:
      - name: Verify Render Backend
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" $RENDER_BACKEND_URL)
          if [ $response -eq 200 ]; then
            echo "✅ Render backend is healthy (HTTP $response)"
          else
            echo "⚠️ Render backend returned HTTP $response"
            exit 1
          fi
      - name: Verify Vercel Frontend
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" $VERCEL_FRONTEND_URL)
          if [ $response -eq 200 ]; then
            echo "✅ Vercel frontend is healthy (HTTP $response)"
          else
            echo "⚠️ Vercel frontend returned HTTP $response"
            exit 1
          fi
```

### 自動デプロイフロー
1. `main`ブランチへPush
2. GitHub Actions: Backend Test & Frontend Test実行
3. Vercel: 自動ビルド＆デプロイ
4. Render: 自動ビルド＆デプロイ
5. GitHub Actions: デプロイ確認（ヘルスチェック）
6. 全グリーン → 本番反映完了

## 環境変数管理

### Frontend（Vercel）
Vercel Dashboard → Settings → Environment Variables:
```bash
NEXT_PUBLIC_API_URL=https://portfolio-backend-rf8v.onrender.com
```

### Backend（Render）
Render Dashboard → Environment:
```bash
SUPABASE_URL=https://szzogbswbwbkszhwfjpe.supabase.co
SUPABASE_KEY=eyJhbG...（anon key）
PYTHON_VERSION=3.11.11
```

### ローカル開発
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# backend/.env
SUPABASE_URL=https://szzogbswbwbkszhwfjpe.supabase.co
SUPABASE_KEY=eyJhbG...
```

## 監視とログ

### ログ管理

#### Vercel Logs
Vercel Dashboard → Deployments → [デプロイ選択] → Logs:
- ビルドログ
- ランタイムログ（Edge Functions）
- リアルタイムログストリーミング

#### Render Logs
Render Dashboard → Logs:
- デプロイログ
- アプリケーションログ（stdout/stderr）
- ヘルスチェックログ

### モニタリング

#### Vercel Analytics
- Core Web Vitals（LCP, FID, CLS）
- リアルタイムトラフィック
- エラートラッキング

#### Render Metrics
- CPU使用率
- メモリ使用率
- リクエスト数/秒
- 応答時間

### ヘルスチェック
- **Backend**: `GET https://portfolio-backend-rf8v.onrender.com/`
- **Frontend**: `GET https://portfolio-frontend-saoki0913s-projects.vercel.app/`
- **GitHub Actions**: 5分ごとに自動確認（Deployment Verification job）

## トラブルシューティング

### よくある問題

#### 1. Vercel デプロイエラー
**症状**: `Error: Vulnerable version of Next.js detected`
**原因**: Next.jsのセキュリティ脆弱性
**解決策**:
```bash
cd frontend
npm install next@latest react@latest react-dom@latest
git add package.json package-lock.json
git commit -m "fix: Update Next.js to latest version"
git push origin main
```

#### 2. Render コールドスタート
**症状**: 初回リクエストが遅い（15秒以上）
**原因**: Freeプランはアイドル時にスリープ
**解決策**:
- Starter Planへアップグレード（$7/month）
- または、定期的にヘルスチェック実行（UptimeRobotなど）

#### 3. CORS エラー
**症状**: `Access to fetch at 'https://portfolio-backend-rf8v.onrender.com' from origin 'https://portfolio-frontend-saoki0913s-projects.vercel.app' has been blocked by CORS policy`
**原因**: バックエンドのCORS設定不足
**解決策**:
```python
# backend/src/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-frontend-saoki0913s-projects.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 4. Supabase接続エラー
**症状**: `supabase.exceptions.APIError: 401 Unauthorized`
**原因**: 環境変数の設定ミス
**解決策**:
1. Render Dashboard → Environment で`SUPABASE_KEY`確認
2. Supabase Dashboard → Settings → API で`anon public key`コピー
3. 値が一致しているか確認

#### 5. Node.js バージョンエラー
**症状**: `You are using Node.js 18.x. For Next.js, Node.js version ">=20.9.0" is required.`
**原因**: Next.js 16はNode.js 20以上が必須
**解決策**:
```json
// frontend/package.json
{
  "engines": {
    "node": ">=20.9.0"
  }
}
```

## ロールバック手順

### Vercel ロールバック
1. Vercel Dashboard → Deployments
2. 以前の正常なデプロイを選択
3. "Promote to Production"

### Render ロールバック
1. Render Dashboard → Deploys
2. 以前の正常なデプロイを選択
3. "Rollback to this deploy"

### Supabase データロールバック
1. Supabase Dashboard → Database → Backups
2. 復元ポイントを選択
3. "Restore"（Pro Plan以上）

## デプロイチェックリスト

### デプロイ前
- [ ] ローカルでビルド成功（`npm run build`, `uvicorn src.main:app`）
- [ ] TypeScript型チェックパス（`npm run tsc --noEmit`）
- [ ] Python Lintパス（`flake8 src/`）
- [ ] 環境変数確認（Vercel, Render）
- [ ] CHANGELOG.md更新

### デプロイ後
- [ ] Vercel デプロイ成功確認
- [ ] Render デプロイ成功確認
- [ ] GitHub Actions 全ジョブグリーン
- [ ] フロントエンド動作確認（https://portfolio-frontend-saoki0913s-projects.vercel.app）
- [ ] バックエンドAPI確認（https://portfolio-backend-rf8v.onrender.com/docs）
- [ ] Supabaseデータ取得確認

## セキュリティ考慮事項

### アクセス制御
- Supabase RLS（Row Level Security）による読み取り制限
- 環境変数による機密情報管理（Vercel/Render Secrets）
- HTTPS強制（Vercel/Render自動設定）

### 依存関係の脆弱性対策
```bash
# フロントエンド
npm audit
npm audit fix

# バックエンド
pip install pip-audit
pip-audit
```

### 定期的なセキュリティ更新
- Dependabot有効化（GitHub Settings → Security）
- 自動PR作成 → レビュー → マージ

## パフォーマンス最適化

### Vercel Edge Network
- 自動CDN配信（世界中のエッジサーバー）
- 画像最適化（next/image）
- 静的ファイルキャッシング

### Render
- 自動スケーリング（Starter Plan以上）
- ヘルスチェック監視
- 定期的な再起動（Free Planは14日ごと）

## 本番URL一覧

| サービス | URL | 用途 |
|---------|-----|------|
| フロントエンド | https://portfolio-frontend-saoki0913s-projects.vercel.app | 本番サイト |
| バックエンドAPI | https://portfolio-backend-rf8v.onrender.com | REST API |
| Swagger UI | https://portfolio-backend-rf8v.onrender.com/docs | APIドキュメント |
| Supabase | https://szzogbswbwbkszhwfjpe.supabase.co | データベース |
| GitHubリポジトリ | https://github.com/saoki0913/portfolio | ソースコード |
