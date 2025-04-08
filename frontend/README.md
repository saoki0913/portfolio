# ポートフォリオサイト

早稲田大学創造理工学研究科の修士1年生、青木俊介のポートフォリオサイトです。AIロボティクスの研究とWebエンジニアとしての経験を紹介しています。

## システム構成

このプロジェクトは、フロントエンドとバックエンドで構成される完全なフルスタックアプリケーションです。

### フロントエンド

- **フレームワーク**: Next.js 15.2.4
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォーム管理**: React Hook Form
- **バリデーション**: Zod
- **UIコンポーネント**: Radix UI
- **アニメーション**: tw-animate-css

### バックエンド

- **フレームワーク**: FastAPI 0.115.12
- **言語**: Python 3.10
- **データベース**: SQLAlchemy 2.0.40
- **サーバー**: Uvicorn 0.34.0
- **環境変数管理**: python-dotenv 1.0.1
- **コンテナ化**: Docker

## プロジェクト構造

```
portfolio/
├── frontend/              # フロントエンドアプリケーション
│   ├── src/
│   │   ├── app/          # Next.js アプリケーション
│   │   │   ├── works/    # プロジェクト詳細ページ
│   │   │   ├── page.tsx  # メインページ
│   │   │   └── layout.tsx # レイアウト
│   │   ├── components/   # コンポーネント
│   │   │   ├── sections/ # メインページのセクション
│   │   │   └── ui/      # 共通UIコンポーネント
│   │   └── lib/         # ユーティリティ関数
│   └── package.json
│
└── backend/              # バックエンドアプリケーション
    ├── main.py          # メインアプリケーション
    ├── requirements.txt # Pythonパッケージ依存関係
    ├── Dockerfile       # Dockerコンテナ設定
    └── .env            # 環境変数
```

## 主な機能

- レスポンシブデザイン
- プロジェクト詳細ページ
- コンタクトフォーム（メール送信機能付き）
- スキルセクションのアニメーション
- ソーシャルメディアリンク
- RESTful API エンドポイント
  - `/api/projects`: プロジェクト一覧の取得
  - `/api/skills`: スキル一覧の取得
  - `/api/contact`: コンタクトフォームの送信

## 開発環境のセットアップ

### フロントエンド

1. 依存関係のインストール:
```bash
cd frontend
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

### バックエンド

1. Python仮想環境の作成と有効化:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linuxの場合
venv\Scripts\activate     # Windowsの場合
```

2. 依存関係のインストール:
```bash
pip install -r requirements.txt
```

3. 環境変数の設定:
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. 開発サーバーの起動:
```bash
uvicorn main:app --reload
```

### Dockerを使用する場合

```bash
cd backend
docker build -t portfolio-backend .
docker run -p 8000:8000 portfolio-backend
```

## デプロイ

### フロントエンド
```bash
cd frontend
npm run build
npm start
```

### バックエンド
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## ライセンス

# ポートフォリオサイト

早稲田大学創造理工学研究科の修士1年生、青木俊介のポートフォリオサイトです。AIロボティクスの研究とWebエンジニアとしての経験を紹介しています。

## 技術スタック

- **フレームワーク**: Next.js 15.2.4
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォーム管理**: React Hook Form
- **バリデーション**: Zod
- **UIコンポーネント**: Radix UI
- **アニメーション**: tw-animate-css

## プロジェクト構造

```
src/
├── app/                    # Next.js アプリケーション
│   ├── works/             # プロジェクト詳細ページ
│   ├── page.tsx           # メインページ
│   ├── layout.tsx         # レイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # コンポーネント
│   ├── sections/         # メインページのセクション
│   │   ├── Header.tsx    # ヘッダーナビゲーション
│   │   ├── Hero.tsx      # ヒーローセクション
│   │   ├── About.tsx     # 自己紹介セクション
│   │   ├── Works.tsx     # プロジェクト一覧
│   │   ├── Skills.tsx    # スキルセクション
│   │   └── Contact.tsx   # コンタクトフォーム
│   └── ui/               # 共通UIコンポーネント
└── lib/                  # ユーティリティ関数
```

## 主な機能

- レスポンシブデザイン
- プロジェクト詳細ページ
- コンタクトフォーム
- スキルセクションのアニメーション
- ソーシャルメディアリンク

## 開発環境のセットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ビルド:
```bash
npm run build
```

4. 本番環境での起動:
```bash
npm start
```

## ライセンス

このプロジェクトはプライベートです。無断での使用・複製を禁止します。
