# 開発環境セットアップ

## 1. 前提条件

### 1.1 必須ソフトウェア

| ソフトウェア | バージョン | 確認コマンド |
|-------------|-----------|-------------|
| Node.js | 18.0.0以上 | `node --version` |
| npm | 9.0.0以上 | `npm --version` |
| Python | 3.12以上 | `python --version` または `python3 --version` |
| pip | 最新 | `pip --version` または `pip3 --version` |
| Git | 2.0以上 | `git --version` |

### 1.2 推奨ソフトウェア

| ソフトウェア | 用途 |
|-------------|------|
| VS Code | IDE（Claude Code拡張機能対応） |
| GitHub Copilot | コード補完 |
| Postman / Insomnia | APIテスト |
| TablePlus / DBeaver | データベース管理 |

---

## 2. プロジェクトのクローン

```bash
# GitHubリポジトリをクローン
git clone https://github.com/shunsuke-aoki/portfolio.git
cd portfolio
```

---

## 3. Backend（FastAPI）セットアップ

### 3.1 仮想環境の作成

```bash
cd backend

# 仮想環境作成
python3 -m venv venv

# 仮想環境の有効化
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

**確認**: プロンプトに `(venv)` が表示される

### 3.2 依存関係のインストール

```bash
pip install -r requirements.txt
```

**インストールされるパッケージ**:
- FastAPI 0.95.1
- Uvicorn 0.22.0
- SQLAlchemy 2.0.12
- Supabase 1.0.3
- Pydantic 1.10.7
- python-dotenv 1.0.0
- その他

### 3.3 環境変数の設定

```bash
# .env ファイルを作成
cp .env.example .env  # または手動で作成

# .env ファイルを編集
vim .env  # または好きなエディタ
```

**.env ファイル内容**:
```bash
# Supabase設定
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# CORS設定
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# Mock Mode設定
USE_MOCK_DATA=True  # 開発初期はTrue、Supabase設定後はFalse

# メール設定（オプション）
EMAILS_ENABLED=False
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_RECIPIENT=recipient@example.com

# API設定
API_PREFIX=
```

### 3.4 Supabaseプロジェクトの設定（オプション）

**Mock Modeを使用する場合、この手順はスキップ可能**

1. **Supabaseアカウント作成**
   - https://supabase.com にアクセス
   - GitHubアカウントでサインアップ

2. **新しいプロジェクト作成**
   - プロジェクト名: `portfolio`
   - データベースパスワードを設定
   - リージョン選択（Northeast Asia - Tokyo推奨）

3. **接続情報の取得**
   - Project Settings → API
   - `URL` と `anon/public key` をコピー
   - `.env` ファイルに設定

4. **データベーススキーマ作成**
   ```sql
   -- Supabase SQL Editorで実行
   -- 詳細は 02_database_design.md を参照
   ```

### 3.5 開発サーバーの起動

```bash
# backend/ ディレクトリで実行
uvicorn app.main:app --reload --port 8000
```

**確認**:
- `http://localhost:8000` → `{"message": "Welcome to Portfolio API"}`
- `http://localhost:8000/docs` → Swagger UIが表示される
- `http://localhost:8000/redoc` → ReDocが表示される

**Turbopack起動時の出力例**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345] using WatchFiles
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## 4. Frontend（Next.js）セットアップ

### 4.1 依存関係のインストール

```bash
cd frontend

# npmパッケージのインストール
npm install
```

**インストールされるパッケージ**:
- Next.js 15.2.4
- React 19.0.0
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12.23.24
- Radix UI
- Axios 1.8.4
- React Hook Form 7.55.0
- Zod 3.24.2
- その他

### 4.2 環境変数の設定

```bash
# .env.local ファイルを作成
cp .env.local.example .env.local  # または手動で作成

# .env.local ファイルを編集
vim .env.local
```

**.env.local ファイル内容**:
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4.3 開発サーバーの起動

```bash
# frontend/ ディレクトリで実行
npm run dev
```

**確認**:
- `http://localhost:3000` → ポートフォリオサイトが表示される

**Turbopack起動時の出力例**:
```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 1.2s
```

---

## 5. VS Code セットアップ

### 5.1 推奨拡張機能

**.vscode/extensions.json** (プロジェクトルートに配置):
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "charliermarsh.ruff",
    "anthropics.claude-code"
  ]
}
```

### 5.2 VS Code設定

**.vscode/settings.json**:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "python.linting.enabled": true,
  "python.formatting.provider": "black",
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 6. Git設定

### 6.1 .gitignore確認

**すでにプロジェクトに含まれているか確認**:
```bash
cat .gitignore
```

**主要な除外項目**:
```
# Dependencies
node_modules/
venv/

# Environment variables
.env
.env.local

# Build outputs
.next/
dist/
__pycache__/

# IDE
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea/
```

### 6.2 Git Hooks（オプション）

**Pre-commit hook（Husky + lint-staged）**:
```bash
# frontend/
npm install --save-dev husky lint-staged

# package.json に追加
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

---

## 7. 開発ワークフロー

### 7.1 通常の開発フロー

1. **Backend起動**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload --port 8000
   ```

2. **Frontend起動（別ターミナル）**
   ```bash
   cd frontend
   npm run dev
   ```

3. **開発**
   - `http://localhost:3000` でフロントエンド確認
   - `http://localhost:8000/docs` でAPI確認

4. **コミット**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

### 7.2 Mock Mode開発フロー

**Supabase未設定時の開発手順**:

1. **Backend `.env` で Mock Mode有効化**
   ```bash
   USE_MOCK_DATA=True
   ```

2. **Backend起動**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend起動**
   ```bash
   npm run dev
   ```

4. **確認**
   - すべてのAPIエンドポイントがMockデータを返す
   - Supabase接続不要でUI開発可能

---

## 8. トラブルシューティング

### 8.1 Backend起動エラー

**エラー**: `ModuleNotFoundError: No module named 'fastapi'`

**解決策**:
```bash
# 仮想環境が有効化されているか確認
which python  # venv/bin/python が表示されるべき

# 依存関係を再インストール
pip install -r requirements.txt
```

---

**エラー**: `Supabase connection failed`

**解決策**:
```bash
# Mock Modeを有効化
echo "USE_MOCK_DATA=True" >> .env

# または Supabase接続情報を確認
echo $SUPABASE_URL
echo $SUPABASE_KEY
```

---

### 8.2 Frontend起動エラー

**エラー**: `Cannot find module 'next'`

**解決策**:
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

---

**エラー**: `API connection failed`

**解決策**:
```bash
# Backend APIが起動しているか確認
curl http://localhost:8000

# .env.local の NEXT_PUBLIC_API_URL を確認
cat .env.local
```

---

### 8.3 CORS エラー

**エラー**: ブラウザコンソールに `CORS policy` エラー

**解決策**:
```python
# backend/.env で CORS設定を確認
BACKEND_CORS_ORIGINS=["http://localhost:3000"]

# backend/app/main.py でミドルウェア確認
```

---

### 8.4 ポート競合

**エラー**: `Address already in use`

**解決策**:
```bash
# ポート8000を使用しているプロセスを確認
lsof -i :8000

# プロセスを終了
kill -9 <PID>

# または別ポートを使用
uvicorn app.main:app --reload --port 8001
```

---

## 9. データベース初期化（Supabase使用時）

### 9.1 スキーマ作成

```sql
-- Supabase SQL Editorで実行
-- 詳細は 02_database_design.md を参照

-- 1. Works関連
CREATE TABLE works (...);
CREATE TABLE work_technologies (...);
CREATE TABLE screenshots (...);

-- 2. Skills関連
CREATE TABLE skill_categories (...);
CREATE TABLE skills (...);

-- 3. About関連
CREATE TABLE abouts (...);
CREATE TABLE educations (...);
CREATE TABLE experiences (...);
CREATE TABLE social_media (...);

-- 4. Hero関連
CREATE TABLE hero_introduction (...);
CREATE TABLE timeline_items (...);

-- 5. Contact関連
CREATE TABLE contact_messages (...);
```

### 9.2 サンプルデータ投入

```sql
-- サンプルデータ（02_database_design.md参照）
INSERT INTO works (...) VALUES (...);
INSERT INTO skills (...) VALUES (...);
-- ...
```

---

## 10. チェックリスト

開発環境セットアップ完了後の確認:

### Backend
- [ ] Python 3.12以上インストール済み
- [ ] 仮想環境作成済み
- [ ] 依存関係インストール済み
- [ ] `.env` ファイル設定済み
- [ ] `uvicorn app.main:app --reload --port 8000` で起動成功
- [ ] `http://localhost:8000/docs` でSwagger UI表示

### Frontend
- [ ] Node.js 18以上インストール済み
- [ ] 依存関係インストール済み
- [ ] `.env.local` ファイル設定済み
- [ ] `npm run dev` で起動成功
- [ ] `http://localhost:3000` でサイト表示

### その他
- [ ] VS Code拡張機能インストール済み
- [ ] Git設定確認済み
- [ ] Claude Code拡張機能インストール済み

---

## 11. まとめ

開発環境セットアップの基本フロー:

1. **プロジェクトクローン**
2. **Backend セットアップ**（仮想環境、依存関係、環境変数）
3. **Frontend セットアップ**（依存関係、環境変数）
4. **開発サーバー起動**（Backend + Frontend）
5. **動作確認**

Mock Modeを活用することで、Supabase未設定でも即座に開発を開始できる。
