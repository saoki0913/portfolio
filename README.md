# ポートフォリオサイト

Next.js（フロントエンド）とFastAPI（バックエンド）を使用した、モダンで高パフォーマンスなポートフォリオサイトのプロジェクトです。動的データ取得とSEO対策を両立したJamstackアーキテクチャを採用しています。

## 技術スタック

### フロントエンド

- **Next.js 15** - Reactベースのフレームワーク（App Routerを採用）
- **React 19** - UIコンポーネントライブラリ
- **TypeScript** - 型安全なJavaScript
- **Tailwind CSS 4** - ユーティリティファーストのCSSフレームワーク
- **Axios** - HTTPクライアント
- **Radix UI** - アクセシビリティに配慮したUIコンポーネント
- **React Hook Form** - フォーム状態管理
- **Zod** - スキーマ検証
- **Lucide React** - アイコンライブラリ
- **Turbopack** - 高速開発サーバー

### バックエンド

- **FastAPI** - モダンで高速なPythonウェブフレームワーク
- **Pydantic** - データバリデーションとシリアライゼーション
- **SQLAlchemy** - Pythonの強力なORMライブラリ
- **Supabase** - PostgreSQLベースのBaaS（Firebase代替）
- **Uvicorn** - ASGIウェブサーバー
- **Python-Multipart** - フォームデータ処理
- **Email-Validator** - メールアドレス検証
- **Python-Dotenv** - 環境変数管理

### インフラストラクチャ

- **Supabase** - データベース、ストレージ、認証
- **PostgreSQL** - リレーショナルデータベース
- **SMTP** - メール送信（Gmail SMTPサポート）

## プロジェクト構成

```
portfolio/
├── frontend/ # Next.jsフロントエンド
│   ├── src/
│   │   ├── app/ # App Routerページコンポーネント
│   │   │   ├── page.tsx # ホームページ
│   │   │   ├── works/[id]/page.tsx # 作品詳細ページ
│   │   │   └── layout.tsx # レイアウト
│   │   ├── components/ # UIコンポーネント
│   │   │   ├── ui/ # 基本UIコンポーネント
│   │   │   ├── sections/ # ページセクションコンポーネント
│   │   │   │   ├── Hero.tsx # ヒーローセクション
│   │   │   │   ├── About.tsx # 自己紹介セクション
│   │   │   │   ├── Skills.tsx # スキルセクション
│   │   │   │   ├── Works.tsx # 作品セクション
│   │   │   │   └── Contact.tsx # コンタクトセクション
│   │   │   ├── works/ # 作品関連コンポーネント
│   │   │   └── ContactForm.tsx # コンタクトフォーム
│   │   └── lib/ # ユーティリティ、型定義、API
│   │       ├── api/ # APIクライアント
│   │       │   ├── client.ts # Axiosクライアント設定
│   │       │   ├── works.ts # 作品API
│   │       │   ├── skills.ts # スキルAPI
│   │       │   ├── about.ts # 自己紹介API
│   │       │   ├── hero.ts # ヒーローセクションAPI
│   │       │   └── contact.ts # コンタクトAPI
│   │       └── types/ # TypeScript型定義
│   ├── public/ # 静的ファイル
│   │   ├── profile.jpg # プロフィール画像
│   │   └── works/ # 作品のサムネイル画像
│   ├── tailwind.config.js # Tailwind CSS設定
│   └── package.json # 依存関係
├── backend/ # FastAPIバックエンド
│   ├── app/ # アプリケーションコード
│   │   ├── main.py # アプリケーションのエントリーポイント
│   │   ├── database.py # データベース接続設定
│   │   ├── api/ # APIエンドポイント
│   │   │   ├── works.py # 作品API
│   │   │   ├── skills.py # スキルAPI
│   │   │   ├── about.py # 自己紹介API
│   │   │   ├── hero.py # ヒーローセクションAPI
│   │   │   └── contact.py # コンタクトAPI
│   │   ├── core/ # 設定やユーティリティ
│   │   │   └── config.py # 環境変数と設定
│   │   ├── models/ # データモデル
│   │   └── schemas/ # Pydanticスキーマ
│   │       ├── works.py # 作品スキーマ
│   │       ├── skills.py # スキルスキーマ
│   │       ├── about.py # 自己紹介スキーマ
│   │       ├── hero.py # ヒーローセクションスキーマ
│   │       └── contact.py # コンタクトスキーマ
│   ├── .env # 環境変数
│   └── requirements.txt # Pythonの依存関係
└── README.md # このファイル
```

## 主要機能

- **レスポンシブデザイン** - モバイルからデスクトップまで対応
- **ダイナミックコンテンツ** - バックエンドAPIを使用した動的データ表示
- **作品ポートフォリオ** - ユーザーの作品を詳細ページ付きで紹介
- **スキルセクション** - 技術スキルの視覚的な表示
- **タイムライン** - 経歴や学歴をタイムライン形式で表示
- **コンタクトフォーム** - フォーム送信とメール通知機能
- **パフォーマンス最適化** - 高速ページロードとレンダリング
- **アクセシビリティ対応** - WAI-ARIA準拠のUIコンポーネント

## API詳細

- **Works API**: プロジェクト作品の一覧と詳細情報を取得
  - `GET /works` - 全作品一覧
  - `GET /works/{id}` - 作品詳細

- **Skills API**: スキルカテゴリと個別スキル情報を取得
  - `GET /skills` - 全スキル一覧とカテゴリ

- **About API**: プロフィール、職歴、学歴などの情報を取得
  - `GET /about` - プロフィール全情報

- **Hero API**: ヒーローセクションの自己紹介とタイムライン情報を取得
  - `GET /hero/introduction` - 自己紹介テキスト
  - `GET /hero/timeline` - タイムライン項目

- **Contact API**: お問い合わせメッセージの送信と保存
  - `POST /contact` - メッセージ送信

## データベース設計

Supabaseで以下のテーブルを使用:

- `works` - ポートフォリオ作品情報
- `skills` - スキル情報
- `skill_categories` - スキルカテゴリ
- `about` - 基本プロフィール情報
- `educations` - 学歴情報
- `experiences` - 職歴情報
- `hero_introduction` - ヒーローセクションのテキスト
- `timeline_items` - タイムライン項目
- `contact_messages` - 送信されたお問い合わせメッセージ

## 環境構築方法

### 前提条件

- Node.js 18以上
- Python 3.10以上
- Supabaseアカウント（または別のPostgreSQLデータベース）

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

3. 環境変数ファイルの作成と編集

```bash
cp .env.example .env
# .envファイルを編集してSupabase URLとAPIキーを設定
```

4. 開発サーバーの起動

```bash
uvicorn app.main:app --reload
```

バックエンドAPI: http://localhost:8000  
APIドキュメント: http://localhost:8000/docs

#### フロントエンド (Next.js)

1. 依存パッケージのインストール

```bash
cd frontend
npm install
```

2. 環境変数ファイルの作成と編集

```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URLを設定（デフォルトはhttp://localhost:8000）
```

3. 開発サーバーの起動

```bash
npm run dev
```

フロントエンド: http://localhost:3000

## メール機能の設定

コンタクトフォームからメールを送信するには:

1. `.env` ファイルで `EMAILS_ENABLED=True` を設定
2. SMTPサーバー情報を設定:
   - `SMTP_HOST`: SMTPサーバー (例: smtp.gmail.com)
   - `SMTP_PORT`: SMTPポート (例: 587)
   - `SMTP_USER`: メールアドレス
   - `SMTP_PASSWORD`: Googleアカウントの「アプリパスワード」（2段階認証が必要）
3. 受信者のメールアドレスを設定:
   - `EMAIL_RECIPIENT`: 問い合わせを受け取るメールアドレス

## デプロイ方法

### Vercel (フロントエンド)

1. GitHubリポジトリをVercelに接続
2. 新しいプロジェクトとして `frontend` ディレクトリをインポート
3. 環境変数 `NEXT_PUBLIC_API_URL` にバックエンドAPIのURLを設定
4. デプロイ

### Railway / Render (バックエンド)

1. GitHubリポジトリをRailway/Renderに接続
2. 新しいプロジェクトとして `backend` ディレクトリをインポート
3. 必要な環境変数をすべて設定
4. デプロイ

## パフォーマンス最適化

- **画像最適化**: Next.jsの`Image`コンポーネントを使用
- **コンポーネントの遅延ロード**: React `lazy` と `Suspense` の活用
- **API応答のキャッシュ**: 静的生成とサーバーサイドレンダリングの併用
- **CSS最適化**: Tailwind CSSのパージ機能を活用

## セキュリティ対策

- **CORS設定**: 許可されたオリジンからのリクエストのみ許可
- **XSS対策**: Reactの自動エスケープと適切なデータバインディング
- **CSRFプロテクション**: 適切なトークン処理
- **環境変数保護**: 機密情報は環境変数で管理

## 将来の拡張予定

- ダークモード対応
- 多言語対応 (i18n)
- ブログ機能の追加
- 認証システムの実装

## トラブルシューティング

**APIエラー: `connect ECONNREFUSED 127.0.0.1:8000`**
- バックエンドサーバーが起動していることを確認
- `.env.local`の`NEXT_PUBLIC_API_URL`が正しいことを確認

**コンタクトフォームのメールが送信されない**
- `.env`で`EMAILS_ENABLED=True`になっているか確認
- SMTPの認証情報が正しいか確認
- Googleアカウントの「安全性の低いアプリ」設定やアプリパスワードを確認


## 作者

青木 駿介
shunsuke.aoki0913@gmail.com
