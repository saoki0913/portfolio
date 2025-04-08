# Portfolio Website

モダンでレスポンシブなポートフォリオウェブサイト。Next.jsとFastAPIを使用したフルスタックアプリケーション。

## 機能

- レスポンシブデザイン
- プロジェクトギャラリー
- スキルセットの表示
- コンタクトフォーム
- プロジェクト詳細ページ

## 技術スタック

### フロントエンド
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

### バックエンド
- Python
- FastAPI
- SQLAlchemy
- SMTP (メール送信)

## セットアップ

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

### バックエンド

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 環境変数

バックエンドの`.env`ファイルを作成し、以下の変数を設定してください：

```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
RECEIVER_EMAIL=your-email@gmail.com
```

## デプロイ

### フロントエンド (Vercel)

1. GitHubにリポジトリを作成
2. フロントエンドのコードをプッシュ
3. Vercelでプロジェクトをインポート
4. 環境変数を設定:
   - `NEXT_PUBLIC_API_URL`: バックエンドのURL

### バックエンド (Render)

1. GitHubにリポジトリを作成
2. バックエンドのコードをプッシュ
3. RenderでWeb Serviceを作成
4. 環境変数を設定:
   - `SMTP_EMAIL`
   - `SMTP_PASSWORD`
   - `RECEIVER_EMAIL`

## プロジェクト構造

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   └── projects/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── components/
│   │       ├── Navbar.tsx
│   │       └── ProjectCard.tsx
│   └── next.config.js
└── backend/
    ├── main.py
    ├── requirements.txt
    ├── Dockerfile
    └── .env
```
