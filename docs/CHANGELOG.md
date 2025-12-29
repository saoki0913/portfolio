# Changelog

すべての重要な変更はこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.0.0/) に基づいています。
バージョニングは [Semantic Versioning](https://semver.org/lang/ja/) に従います。

## [Unreleased]

## [3.1.0] - 2025-12-30

### Added（追加）
- GitHub Actions CHANGELOGワークフローを追加
  - pushトリガーでdocs/CHANGELOG.mdを自動更新
  - Conventional Commitsに対応（feat, fix, refactor等）
  - [skip changelog]でスキップ可能

### Changed（変更）
- オープニングアニメーションのプログレスバーを修正
  - motion.div → div + CSS transitionに変更（Framer Motionの制限回避）
  - プログレスバーの高さを増加（h-1.5 → h-2）
  - シマーアニメーションを追加
- Contactセクションのデザイン改善
  - フォーム入力のフォーカス状態にbrandカラーを適用
  - フォーカスリングエフェクトを追加
  - ボタンスタイリングをホバーアニメーション付きに更新
  - セクション背景をWorks/Skillsセクションと統一
  - カードヘッダーとホバー時の装飾ボーダーを追加

### Infrastructure（インフラ）
- フロントエンド: Vercel デプロイ成功（ca68fdc）
- バックエンド: Render デプロイ成功（a3d2fe0）
- Supabase: 全テーブル正常稼働（8テーブル、RLS設定済み）

## [3.0.0] - 2025-12-29

### Added（追加）
- Supabaseデータベースに詳細なポートフォリオコンテンツを追加
  - Works: Azure RAGシステム（13技術）、スケジュール管理（11技術）、ポートフォリオ（11技術）の詳細情報
  - Skills: 21の新しいスキル追加（SQL, Tailwind CSS, MUI, Pydantic, Uvicorn, LangChain, PostgreSQL, Supabase, Azure Cosmos DB, Vercel, Render, Azure OpenAI Service, OpenAI API, RAG, 深層学習, Microsoft Graph API, SharePoint Online, Mypy, Flake8, Vitest, Playwright）
  - Skills: 新カテゴリ「データベース」「AI・機械学習」を追加
  - Timeline: EQUES株式会社の経験を追加（2025.2 - 現在、11ヶ月）
  - Experience: Intelligent Force（5つの成果）、EQUES（7つの成果）の詳細を追加
  - Education: 双腕ロボット研究の詳細説明を追加
  - About: 研究内容（階層型深層予測学習モデル、LSTM + Union-LSTM、皿洗い動作実験）を追加
- フロントエンド型定義ファイルを新規追加
  - `hero.ts`: HeroIntroduction, TimelineItem型
  - `SkillCategory`型をskill.tsに追加

### Changed（変更）
- バックエンドエンティティをSupabaseスキーマに完全同期
  - Work: id型をstr化、github_link/demo_link/blog_link/screenshots/duration/role/learningsフィールド追加
  - Skill: icon, descriptionフィールド追加
  - Hero: introduction_text→content、year→period、description→subtitle、order_index→sort_orderに変更
  - About: About/Education/Experience/SocialMediaエンティティを完全再構築
  - AboutResponse: about objectを含む構造に変更
- バックエンドリポジトリの実装を更新
  - 全リポジトリのorder_indexをSupabaseの実フィールド（sort_order, start_date等）に変更
  - work_id型をint→strに変更（全レイヤー）
- フロントエンドAPI型定義をバックエンドに同期
  - Work, Skill, About, Education, Experience, SocialMedia, AboutResponse型を完全一致
  - works.ts, hero.ts APIクライアントで型インポートを整理
  - AboutResponse型を使用するようAbout.tsxを更新
  - HeroSection, ProjectInfoコンポーネントをgithub_link/demo_link/blog_linkフィールドに対応

### Fixed（修正）
- Screenshots.tsxの型エラーを修正（Record型を配列として扱う処理を追加）
- フロントエンドビルドエラーをすべて解消

### Removed（削除）
- 未使用ファイル `project-detail-layout.tsx` を削除
- Pythonキャッシュファイル（`__pycache__`, `*.pyc`）をクリーンアップ
- .DS_Storeファイルをクリーンアップ

## [2.1.0] - 2025-12-29

### Added（追加）
- GitHub Actions CI/CDパイプライン実装
  - バックエンド: Python Linting、起動テスト
  - フロントエンド: TypeScript型チェック、ビルドテスト
  - デプロイ確認: Render/Vercelヘルスチェック自動実行
- README.mdにCI/CDステータスバッジ追加

### Changed（変更）
- Next.js 15.2.4 → 16.1.1にアップデート（CVE-2025-66478脆弱性対応）
- React 19を最新版に更新
- Node.js 18 → 20に更新（GitHub Actions）

### Fixed（修正）
- Vercelデプロイメントエラーを修正
- GitHub ActionsワークフローURLを修正（`portfolio-frontend`）
- npm脆弱性を修正

### Temporarily Disabled（一時的に無効化）
- ESLint実行（Next.js 16でnext lintコマンドが削除されたため）

## [2.0.0] - 2025-12-29

### Added（追加）
- バックエンドにクリーンアーキテクチャを実装
  - Entity層: Work, Skill, About, Hero ドメインモデル
  - Repository Interface層: データアクセスの抽象化
  - Application Service層: ビジネスロジック実装
  - Repository Implementation層: Supabase統合
  - Controller層: HTTPリクエスト処理
  - エラーハンドリング: 統一されたエラーレスポンス
- 依存性注入コンテナ (`src/config/dependencies.py`)
- バックエンド設定管理 (`src/config/settings.py`)

### Changed（変更）
- バックエンド構造を再設計:
  ```
  backend/src/
  ├── core/           # ビジネスロジック（フレームワーク非依存）
  ├── infra/          # インフラ層（DB依存）
  ├── web/            # プレゼンテーション層（HTTP）
  └── config/         # 設定
  ```
- APIエンドポイントをクリーンアーキテクチャに準拠
- バックエンド環境変数を整理

### Fixed（修正）
- Supabaseデータ取得時の日付フォーマット処理
- CORS設定を localhost:3001 に対応

### Infrastructure（インフラ）
- バックエンドの依存関係を整理
- Python 3.11 + FastAPI 0.95.1 + Supabase 1.0.3

## [1.0.0] - 2025-12-28

### Added（追加）
- Supabaseプロジェクト「Portfolio」を新規作成 (ap-northeast-1リージョン)
- データベーススキーマ作成:
  - `hero_introduction` テーブル (1レコード)
  - `timeline_items` テーブル (3レコード)
  - `works` テーブル (3レコード)
  - `skills` テーブル (14レコード)
  - `about` テーブル (1レコード)
  - `education` テーブル (2レコード)
  - `experience` テーブル (1レコード)
  - `social_media` テーブル (2レコード)
- 全テーブルにRLS（Row Level Security）を有効化
- 全テーブルに公開読み取りポリシーを設定
- サンプルデータを全テーブルに投入
- `@supabase/supabase-js` パッケージをフロントエンドに追加
- Supabaseクライアント作成 (`frontend/src/lib/supabase/client.ts`)
- .gitignoreにMCP関連ルール追加
- .claudeディレクトリ配下のドキュメント群を追加
- CHANGELOG.md（本ファイル）を追加
- PROGRESS.md（進捗管理ファイル）を追加

### Changed（変更）
- フロントエンドAPIをバックエンドAxios経由からSupabase直接接続に移行:
  - `frontend/src/lib/api/hero.ts`
  - `frontend/src/lib/api/works.ts`
  - `frontend/src/lib/api/skills.ts`
  - `frontend/src/lib/api/about.ts`
- 環境変数設定を更新 (`frontend/.env.local`):
  - `NEXT_PUBLIC_SUPABASE_URL` 追加
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 追加

### Fixed（修正）
- ローカル環境でのSupabaseデータ取得機能を実装

### Infrastructure（インフラ）
- Supabase環境設定完了
  - プロジェクトID: szzogbswbwbkszhwfjpe
  - URL: https://szzogbswbwbkszhwfjpe.supabase.co
  - リージョン: ap-northeast-1
  - 費用: $0/月（無料プラン）

### 既知の問題
- Vercelデプロイが別リポジトリ（portfolio_frontend）を参照している
- Renderバックエンドが別リポジトリ（portfolio_backend）を参照している
- 本番環境がまだSupabase直接接続に移行していない

---

## 今後の予定

### バックエンド（パート3）
- [ ] クリーンアーキテクチャでバックエンドを再実装
- [ ] Entity層の実装
- [ ] Repository Interface層の実装
- [ ] Application Service層の実装
- [ ] Repository Implementation層（Supabase接続）の実装
- [ ] Controller層の実装

### フロントエンド（パート4）
- [ ] 型定義の整合性確認
- [ ] エラーハンドリングの改善
- [ ] ローディング状態の実装確認

### デプロイ（パート7）
- [ ] Vercelプロジェクトの設定を`portfolio`モノレポに変更
- [ ] Vercel環境変数にSupabase認証情報を追加
- [ ] Renderバックエンドのデプロイ設定更新
- [ ] 本番環境でのSupabase接続確認
