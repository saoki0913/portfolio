# ポートフォリオサイト

Next.js（フロントエンド）とFastAPI（バックエンド）を使用したポートフォリオサイトのプロジェクトです。

## プロジェクト構成

```
portfolio/
├── frontend/ # Next.jsフロントエンド
│   ├── src/ # ソースコード
│   │   ├── app/ # Pageコンポーネント
│   │   ├── components/ # UIコンポーネント
│   │   └── lib/ # ユーティリティ関数、型定義、API呼び出しなど
│   ├── public/ # 静的ファイル
│   └── package.json # 依存関係
├── backend/ # FastAPIバックエンド
│   ├── app/ # アプリケーションコード
│   │   ├── api/ # APIエンドポイント
│   │   ├── core/ # 設定やユーティリティ
│   │   ├── data/ # ダミーデータ
│   │   ├── models/ # データモデル
│   │   ├── schemas/ # Pydanticスキーマ
│   │   └── services/ # サービス層
│   └── requirements.txt # Pythonの依存関係
└── README.md # このファイル
```

## 機能

- **Works API**: プロジェクト作品の情報を取得するAPI
- **Skills API**: スキル情報を取得するAPI
- **About API**: プロフィール情報を取得するAPI
- **Contact API**: 問い合わせフォームからのメッセージを受け取るAPI

## 環境構築方法

### 前提条件

- Node.js 18以上
- Python 3.10以上

### ローカル開発環境の構築

#### バックエンド (FastAPI)

1. 仮想環境の作成と有効化

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windowsの場合: venv\Scripts\activate
```

2. 依存パッケージのインストール

```bash
pip install -r requirements.txt
```

3. 環境変数ファイルの作成

```bash
cp .env.example .env
```

4. 開発サーバーの起動

```bash
uvicorn app.main:app --reload
```

APIドキュメント: http://localhost:8000/docs

#### フロントエンド (Next.js)

1. 依存パッケージのインストール

```bash
cd frontend
npm install
```

2. 環境変数ファイルの作成

```bash
cp .env.example .env.local
```

3. 開発サーバーの起動

```bash
npm run dev
```

フロントエンド: http://localhost:3000

## デプロイ方法

### Vercel (フロントエンド)

1. Vercelアカウントにログイン
2. 新しいプロジェクトとして `frontend` ディレクトリをインポート
3. 環境変数 `NEXT_PUBLIC_API_URL` にバックエンドAPIのURLを設定
4. デプロイ

### Railway / Render (バックエンド)

1. Railway または Render アカウントにログイン
2. 新しいプロジェクトとして `backend` ディレクトリをインポート
3. 以下の環境変数を設定:
   - `EMAILS_ENABLED`: メール送信機能を有効にするかどうか
   - `SMTP_HOST`: SMTPサーバー
   - `SMTP_PORT`: SMTPポート
   - `SMTP_USER`: SMTPユーザー名
   - `SMTP_PASSWORD`: SMTPパスワード
   - `EMAIL_RECIPIENT`: 問い合わせを受け取るメールアドレス
   - `BACKEND_CORS_ORIGINS`: フロントエンドのURL (CSRFプロテクション用)
4. デプロイ

## メール機能の設定

Contact APIでメール送信を有効にするには:

1. `.env` ファイルで `EMAILS_ENABLED=True` を設定
2. SMTPサーバー情報を設定:
   - `SMTP_HOST`: SMTPサーバー (例: smtp.gmail.com)
   - `SMTP_PORT`: SMTPポート (例: 587)
   - `SMTP_USER`: メールアドレス
   - `SMTP_PASSWORD`: メールパスワードまたはアプリパスワード
3. 受信者のメールアドレスを設定:
   - `EMAIL_RECIPIENT`: 問い合わせを受け取るメールアドレス

## ライセンス

MIT

## お問い合わせ

質問や提案があれば、お気軽にお問い合わせください。
