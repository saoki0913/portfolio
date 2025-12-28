# ポートフォリオサイト セットアップガイド

このドキュメントでは、ポートフォリオサイトをローカル環境で起動する手順を説明します。

## 📋 前提条件

- Python 3.11以上
- Node.js 20以上
- npm または yarn
- Docker（GitHub MCPサーバー用）
- Claude Code CLI（オプション）

## 🤖 Claude Code MCP サーバー設定（オプション）

Claude Codeを使用してSupabase、Vercel、Render、GitHubを操作する場合は、以下の手順でMCPサーバーを設定してください。

### 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、以下の環境変数を設定してください：

```bash
# GitHub Personal Access Token
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here

# Supabase Access Token
SUPABASE_ACCESS_TOKEN=your_supabase_token_here

# Render API Key
RENDER_API_KEY=your_render_api_key_here

# Vercel Token（オプション）
VERCEL_TOKEN=your_vercel_token_here
```

### トークン取得方法

#### 1. GitHub Personal Access Token
1. [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) にアクセス
2. "Generate new token (classic)" をクリック
3. 必要なスコープを選択（repo, workflow等）
4. トークンをコピーして`.env`に追加

#### 2. Supabase Access Token
1. [Supabase Dashboard](https://supabase.com/dashboard) にアクセス
2. Settings > Access Tokens に移動
3. "Generate new token" をクリック
4. トークンをコピーして`.env`に追加

#### 3. Render API Key
1. [Render Dashboard](https://dashboard.render.com/) にアクセス
2. Account Settings > API Keys に移動
3. "Create API Key" をクリック
4. トークンをコピーして`.env`に追加

#### 4. Vercel Token（オプション）
1. [Vercel Dashboard > Settings > Tokens](https://vercel.com/account/tokens) にアクセス
2. "Create Token" をクリック
3. トークン名を入力（例: "Claude Code MCP"）
4. トークンをコピーして`.env`に追加

### MCPサーバーの設定ファイル

`.mcp.json`ファイルはすでに設定されています。以下のMCPサーバーが利用可能です：

- **GitHub**: リポジトリ操作、Issue、Pull Request管理
- **Supabase**: データベース操作、認証、ストレージ管理
- **Render**: デプロイ、サービス管理
- **Vercel**: デプロイ、プロジェクト管理（VERCEL_TOKEN設定時のみ）

### Claude Codeの起動

```bash
# プロジェクトルートで起動
claude code
```

MCPサーバーが正しく設定されていれば、Claude Code内からSupabase、Vercel、Renderなどの操作が可能になります。

---

## 🚀 クイックスタート

### 1. バックエンドのセットアップ

#### 1-1. バックエンドディレクトリに移動
```bash
cd backend
```

#### 1-2. Python仮想環境の有効化
```bash
source venv/bin/activate
```

#### 1-3. バックエンドサーバーの起動
```bash
uvicorn app.main:app --reload --port 8000
```

✅ バックエンドサーバーが http://localhost:8000 で起動します
✅ Swagger UIドキュメントは http://localhost:8000/docs で確認できます

### 2. フロントエンドのセットアップ

**新しいターミナルウィンドウを開いてください**

#### 2-1. フロントエンドディレクトリに移動
```bash
cd frontend
```

#### 2-2. フロントエンド開発サーバーの起動
```bash
npm run dev
```

✅ フロントエンドサーバーが http://localhost:3000 で起動します

### 3. ブラウザでアクセス

ブラウザで以下のURLを開いてください:
```
http://localhost:3000
```

## 🎨 デザイン改善内容

### Worksセクション
- モダンなカードデザイン（影、グラデーション）
- ホバー時のアニメーション効果
- 技術タグの追加
- フェードインアニメーション

### Skillsセクション
- カテゴリごとのカード表示
- プログレスバーのアニメーション
- Intersection Observerによるスクロールトリガー
- モダンなグラデーションデザイン

### 全体的な改善
- 統一感のあるセクションヘッダー
- 背景装飾の追加
- スムーズなアニメーション
- レスポンシブデザインの強化

## 🛠️ トラブルシューティング

### バックエンドが起動しない場合

1. Python仮想環境が有効化されているか確認
```bash
which python
# /Users/saoki/work/my_apps/portfolio/backend/venv/bin/python のように表示されるはず
```

2. 依存関係が正しくインストールされているか確認
```bash
pip list
```

### フロントエンドが起動しない場合

1. node_modulesが存在するか確認
```bash
ls node_modules
```

2. 依存関係を再インストール
```bash
npm install
```

### ポート競合エラーの場合

すでにポート8000や3000が使用されている場合は、別のポートを指定してください:

**バックエンド:**
```bash
uvicorn app.main:app --reload --port 8001
```

**フロントエンド (.env.local を更新):**
```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

```bash
npm run dev -- -p 3001
```

## 📁 ディレクトリ構造

```
portfolio/
├── backend/           # FastAPIバックエンド
│   ├── app/
│   │   ├── api/      # APIルーター
│   │   ├── core/     # 設定ファイル
│   │   └── main.py   # エントリーポイント
│   ├── .env          # 環境変数
│   └── venv/         # Python仮想環境
├── frontend/         # Next.jsフロントエンド
│   ├── src/
│   │   ├── app/      # Next.js App Router
│   │   └── components/ # Reactコンポーネント
│   └── .env.local    # 環境変数
└── SETUP.md          # このファイル
```

## 📝 環境変数

### backend/.env
```bash
USE_DUMMY_DATA=True  # ダミーデータを使用（Supabase未設定の場合）
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
PORT=8000
```

### frontend/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🔧 開発コマンド

### フロントエンド
```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run lint     # ESLintチェック
```

### バックエンド
```bash
uvicorn app.main:app --reload --port 8000  # 開発サーバー起動
pytest                                      # テスト実行
```

## 💡 Tips

- 開発中はホットリロードが有効です
- バックエンドを先に起動してからフロントエンドを起動することを推奨します
- エラーが発生した場合は、ブラウザのコンソールとターミナルのログを確認してください

---

**ご質問や問題がある場合は、お気軽にお問い合わせください。**
