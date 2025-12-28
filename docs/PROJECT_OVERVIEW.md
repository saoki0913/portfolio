# プロジェクト概要

## 製品概要
個人ポートフォリオサイトは、モダンなWebエンジニアリングの実践場として開発された、技術力とUXを両立させたフルスタックアプリケーションです。Next.js 16 + FastAPIによる高性能なWebアプリケーションとして、Clean Architecture、Supabase、Vercel/Renderを活用した本格的なプロダクション環境での運用を実現しています。

## 主要機能

### 1. ヒーローセクション
- 自己紹介テキストの動的表示
- タイムライン形式での経歴紹介
- Framer Motionによるスクロール連動アニメーション
- Supabaseからのデータフェッチング（hero_introduction, timeline_items）

### 2. 作品紹介（Works）
- プロジェクト一覧の表示（Bento Gridレイアウト）
- プロジェクト詳細ページ（動的ルーティング）
- 技術スタック、GitHub URL、デモURLの表示
- 画像最適化（Next.js Image）

### 3. スキル管理
- カテゴリ別スキル一覧（Frontend, Backend, Database, Infrastructure, Tools）
- スキルレベルの視覚化
- Glassmorphismデザイン

### 4. プロフィール（About）
- 自己紹介文
- 学歴・職歴の表示（education, experience）
- ソーシャルメディアリンク（GitHub, LinkedIn）

### 5. お問い合わせ（Contact）
- メール送信フォーム
- バリデーション（Zodスキーマ）
- FastAPI経由でのメール送信

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 16.1.1（App Router）
- **ライブラリ**: React 19.2.3
- **言語**: TypeScript 5.7+
- **スタイリング**: Tailwind CSS 4.0
- **アニメーション**: Framer Motion
- **UIコンポーネント**: Radix UI
- **アイコン**: Lucide React

### バックエンド
- **言語**: Python 3.11+
- **フレームワーク**: FastAPI 0.95.1
- **アーキテクチャ**: Clean Architecture（Entity, Repository, Service, Controller）
- **バリデーション**: Pydantic v2
- **HTTPクライアント**: httpx

### データベース
- **メインDB**: Supabase（PostgreSQL）
- **セキュリティ**: Row Level Security（RLS）
- **テーブル数**: 8（hero_introduction, timeline_items, works, skills, about, education, experience, social_media）

### インフラストラクチャ
- **フロントエンドホスティング**: Vercel
- **バックエンドホスティング**: Render
- **CI/CD**: GitHub Actions
- **データベース**: Supabase Cloud

### 開発ツール
- **パッケージ管理**:
  - Frontend: npm
  - Backend: pip（requirements.txt）
- **コード品質**:
  - Frontend: ESLint, Prettier, TypeScript Compiler
  - Backend: Flake8, Black, mypy
- **テスト**:
  - Frontend: Jest, React Testing Library（予定）
  - Backend: pytest（予定）
- **CI/CD**: GitHub Actions（Lint, Build, Deployment Verification）

## システム特性

### パフォーマンス
- Server Componentsによる高速レンダリング
- 画像最適化（next/image）
- 並列データフェッチング（Promise.all）
- Supabase APIキャッシング（Render環境）

### スケーラビリティ
- Vercel Edge Network（世界中のCDN）
- Render Auto Scaling対応
- Supabase自動スケーリング
- Monorepo構成（frontend + backend）

### セキュリティ
- Supabase Row Level Security（RLS）
- 環境変数による機密情報管理
- CORS設定（Frontend ↔ Backend）
- XSS対策（React自動エスケープ）

### 可用性
- ヘルスチェックエンドポイント（`/`）
- GitHub Actions自動デプロイ確認
- Vercel/Render自動デプロイ
- エラーハンドリングミドルウェア

## デザインコンセプト

**"Modern Tech & Minimalist Precision"**

参考: Linear, Vercel, Stripe

| 要素 | 実装方針 |
|------|----------|
| Bento Grid | スキル・実績を整然と配置 |
| Glassmorphism | ブラー・透明感のレイヤー構造 |
| Micro-interactions | Framer Motionでスクロール連動アニメーション |
| Dark Mode First | `zinc-900` + 青/紫アクセント |
| パフォーマンス | Server Components活用、LCP最小化 |
| アクセシビリティ | Radix UI、キーボードナビゲーション対応 |

## 対象ユーザー
- 採用担当者・リクルーター
- 技術リーダー・エンジニアリングマネージャー
- 潜在的なクライアント・ビジネスパートナー
- 同業エンジニア（技術交流）

## プロジェクトステータス
- **環境**: Production
- **フロントエンドURL**: https://portfolio-frontend-saoki0913s-projects.vercel.app
- **バックエンドURL**: https://portfolio-backend-rf8v.onrender.com
- **GitHubリポジトリ**: https://github.com/saoki0913/portfolio
- **Supabase Project**: https://szzogbswbwbkszhwfjpe.supabase.co
- **APIドキュメント**: https://portfolio-backend-rf8v.onrender.com/docs（Swagger UI）
- **バージョン**: v2.1.0
- **CI/CD**: ✅ 自動デプロイ＋ヘルスチェック稼働中
