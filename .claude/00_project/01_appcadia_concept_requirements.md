# ポートフォリオサイト 機能要件定義書

## 1. ドキュメント概要

### 1.1 目的
本ドキュメントは、Shunsuke Aokiのポートフォリオサイトの機能要件を定義し、開発チーム（人間・AI）間での共通理解を確立することを目的とする。

### 1.2 対象読者
- 開発者（フロントエンド・バックエンド）
- AIアシスタント（Claude）
- プロジェクトマネージャー
- デザイナー

### 1.3 ドキュメント管理
- **作成日**: 2025-12-20
- **最終更新**: 2025-12-20
- **バージョン**: 1.0.0

---

## 2. プロジェクト概要

### 2.1 プロジェクトの目的
モダンなWebエンジニアリング技術を駆使した、高品質でインタラクティブなポートフォリオサイトを構築する。単なる自己紹介サイトではなく、技術力・デザインセンス・UXへのこだわりを実証する実践的なプラットフォームとして機能させる。

### 2.2 ターゲットユーザー
- 採用担当者・リクルーター
- 技術系企業のエンジニアリングマネージャー
- 共同研究・プロジェクト協力者
- 技術コミュニティメンバー

### 2.3 ビジネスゴール
1. 技術スキルと実績の効果的な可視化
2. 個人ブランドの確立
3. 採用機会・ビジネス機会の創出
4. 技術的な実験・学習の場としての活用

---

## 3. 機能要件

### 3.1 ユーザーストーリー

#### US-001: ポートフォリオ閲覧
**As a** 採用担当者
**I want to** 候補者のスキル・経歴・実績を一目で把握したい
**So that** 採用判断の材料とすることができる

**受け入れ基準:**
- ヒーローセクションで基本情報（名前、役職、簡潔な自己紹介）を表示
- スキルセクションでカテゴリ別に技術スキルをレベル付きで表示
- 実績セクションでプロジェクト一覧をサムネイル付きで表示
- Aboutセクションで学歴・職歴を時系列で表示

#### US-002: プロジェクト詳細閲覧
**As a** エンジニアリングマネージャー
**I want to** 特定のプロジェクトの詳細（使用技術、役割、成果）を確認したい
**So that** 技術的なマッチング度を評価できる

**受け入れ基準:**
- プロジェクトカードクリックで詳細ページへ遷移
- プロジェクト概要、カテゴリ、使用技術リストを表示
- スクリーンショット・デモリンク・GitHubリンクを提供
- 期間、役割、学びを明示

#### US-003: コンタクト
**As a** プロジェクト協力者
**I want to** ウェブサイトから直接コンタクトを取りたい
**So that** 別のツールを使わずに連絡できる

**受け入れ基準:**
- コンタクトフォーム（名前、メール、件名、メッセージ）を提供
- バリデーション機能（必須項目、メールフォーマット）
- 送信成功・失敗のフィードバック表示
- バックグラウンドでメール送信処理

#### US-004: モバイル閲覧
**As a** モバイルユーザー
**I want to** スマートフォンでも快適にポートフォリオを閲覧したい
**So that** いつでもどこでも情報を確認できる

**受け入れ基準:**
- レスポンシブデザイン（スマートフォン、タブレット、デスクトップ）
- タッチ操作最適化
- ページロード時間2秒以内（モバイル環境）

---

### 3.2 画面・セクション一覧

| セクション | 優先度 | 説明 |
|-----------|--------|------|
| Header | P0 | ナビゲーションメニュー |
| Hero | P0 | ファーストビュー、自己紹介、タイムライン |
| About | P0 | プロフィール、学歴、職歴、SNSリンク |
| Skills | P0 | カテゴリ別スキル一覧（レベル表示） |
| Works | P0 | プロジェクト一覧（Bento Grid） |
| Work Detail | P1 | 個別プロジェクト詳細ページ |
| Contact | P1 | お問い合わせフォーム |
| Footer | P2 | コピーライト、リンク |

---

### 3.3 機能詳細

#### 3.3.1 Heroセクション

**機能ID**: F-HERO-001
**機能名**: ヒーロー自己紹介表示
**説明**: ユーザーの第一印象を形成する、動的でインタラクティブなヒーローセクション

**詳細要件:**
- 名前、肩書き（Robotics Researcher & Developer）を大きく表示
- 自己紹介文をSupabaseから動的取得（Mock対応）
- タイムラインアイテムをカード形式で表示（学歴・職歴を統合）
- Framer Motionによるフェードイン・スクロール連動アニメーション
- カーソルグロー効果（オプション）

**API:**
- `GET /hero/introduction` - 自己紹介テキスト取得
- `GET /hero/timeline` - タイムラインアイテム取得（ソート順付き）

---

#### 3.3.2 Aboutセクション

**機能ID**: F-ABOUT-001
**機能名**: プロフィール情報表示
**説明**: 学歴・職歴・SNSを含む詳細なプロフィール情報

**詳細要件:**
- プロフィール画像表示
- 名前、肩書き、サマリー、詳細なバイオ
- 学歴（Education）
  - 機関名、学位、専攻、期間、説明
  - タイムライン形式で表示
- 職歴（Experience）
  - 企業名、役職、期間、説明、実績リスト
  - 実績は箇条書き表示（JSONまたはカンマ区切り対応）
- SNSリンク（GitHub等）

**API:**
- `GET /about` - プロフィール情報一括取得（教育・経験・SNS含む）

---

#### 3.3.3 Skillsセクション

**機能ID**: F-SKILL-001
**機能名**: スキル一覧表示（カテゴリ別）
**説明**: 技術スキルをカテゴリ分けして、視覚的なレベル表示

**詳細要件:**
- スキルカテゴリ表示（Languages, Frameworks, Tools & Cloud等）
- 各スキル:
  - 名前
  - レベル（0-100の数値、プログレスバー表示）
  - アイコン（オプション）
  - 説明（オプション、ホバー時表示）
- Bento Grid レイアウト
- 拡張可能なカード（Expandable Skill Card）

**API:**
- `GET /skills` - スキル一覧取得（カテゴリ付き）
- `GET /skills/categories` - カテゴリ名のみ取得

---

#### 3.3.4 Worksセクション

**機能ID**: F-WORK-001
**機能名**: プロジェクト一覧表示
**説明**: 過去のプロジェクト実績を魅力的に紹介

**詳細要件:**
- プロジェクトカード表示:
  - サムネイル画像
  - タイトル
  - 簡潔な説明
  - カテゴリ（Web Development, Cloud Architecture, Application等）
  - 使用技術タグ
- Bento Grid レイアウト（不均等サイズ）
- ホバー時のマイクロインタラクション
- カードクリックで詳細ページへ遷移

**API:**
- `GET /works` - 全プロジェクト一覧取得

---

#### 3.3.5 Work Detail ページ

**機能ID**: F-WORK-002
**機能名**: プロジェクト詳細表示
**説明**: 個別プロジェクトの詳細情報ページ

**詳細要件:**
- プロジェクト基本情報:
  - タイトル、カテゴリ、期間、役割
  - 詳細な説明
  - 学び・成果（Learnings）
- 使用技術リスト（タグ形式）
- スクリーンショットギャラリー（キャプション付き）
- 外部リンク:
  - GitHubリポジトリ
  - デモサイト
  - ブログ記事
- 前後のプロジェクトへのナビゲーション

**API:**
- `GET /works/{work_id}` - プロジェクト詳細取得

---

#### 3.3.6 Contactセクション

**機能ID**: F-CONTACT-001
**機能名**: お問い合わせフォーム
**説明**: サイト訪問者からのコンタクトを受け付ける

**詳細要件:**
- フォームフィールド:
  - 名前（必須、テキスト）
  - メールアドレス（必須、メール形式バリデーション）
  - 件名（必須、テキスト）
  - メッセージ（必須、テキストエリア）
- クライアント側バリデーション
- サーバー側バリデーション（Pydantic）
- 送信処理:
  - バックグラウンドタスクでメール送信（SMTP）
  - Supabaseへ問い合わせ履歴保存（オプション）
  - 送信成功時のトースト通知
  - エラー時の適切なフィードバック
- SMTP無効時でもフォーム送信可能（ログ出力）

**API:**
- `POST /contact` - お問い合わせ送信

---

### 3.4 非機能要件

#### 3.4.1 パフォーマンス
| 指標 | 目標値 |
|------|--------|
| LCP (Largest Contentful Paint) | < 2.5秒 |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Time to Interactive | < 3秒 |
| Lighthouse Score | 90点以上 |

**実装方針:**
- Next.js Server Components活用
- 画像最適化（next/image、WebP/AVIF）
- コード分割・遅延読み込み
- Turbopack開発ビルド

#### 3.4.2 セキュリティ
- CORS設定（オリジン制限）
- XSS対策（React自動エスケープ、DOMPurify）
- SQL Injection対策（Supabaseクライアントのパラメータ化クエリ）
- CSRF対策（API Tokenベース認証）
- メールアドレスバリデーション（Pydantic EmailStr）
- HTTPS強制（本番環境）

#### 3.4.3 アクセシビリティ
- WCAG 2.1 Level AA準拠
- セマンティックHTML使用
- Radix UI（アクセシブルなコンポーネント）
- キーボードナビゲーション対応
- スクリーンリーダー対応（ARIA属性）
- 適切なコントラスト比（4.5:1以上）

#### 3.4.4 ブラウザ対応
- **デスクトップ:**
  - Chrome（最新版・1つ前のバージョン）
  - Firefox（最新版・1つ前のバージョン）
  - Safari（最新版・1つ前のバージョン）
  - Edge（最新版）
- **モバイル:**
  - iOS Safari（最新版・1つ前のバージョン）
  - Chrome Android（最新版）

#### 3.4.5 レスポンシブデザイン
| ブレークポイント | デバイス | 幅 |
|-----------------|---------|-----|
| sm | モバイル | 640px |
| md | タブレット | 768px |
| lg | ノートPC | 1024px |
| xl | デスクトップ | 1280px |
| 2xl | 大型ディスプレイ | 1536px |

---

## 4. データモデル

### 4.1 Works（プロジェクト）

```typescript
interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category?: string;
  duration?: string;
  role?: string;
  learnings?: string;
  technologies: string[];
  screenshots: Screenshot[];
  links?: {
    github?: string;
    demo?: string;
    blog?: string;
  };
}

interface Screenshot {
  id: number;
  url: string;
  caption?: string;
}
```

### 4.2 Skills（スキル）

```typescript
interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
}

interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
  icon?: string;
  description?: string;
  category: string;
}
```

### 4.3 About（プロフィール）

```typescript
interface About {
  id: number | string;
  name: string;
  title: string;
  summary: string;
  profile_image: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  social_media: SocialMedia[];
}

interface Education {
  id: number | string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

interface Experience {
  id: number | string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
  achievements?: string[];
}

interface SocialMedia {
  id: number | string;
  platform: string;
  url: string;
  username?: string;
}
```

### 4.4 Hero（ヒーロー）

```typescript
interface HeroIntroduction {
  id: string;
  content: string;
}

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle?: string;
  sort_order: number;
}
```

### 4.5 Contact（お問い合わせ）

```typescript
interface ContactRequest {
  name: string;
  email: string; // EmailStr型（バリデーション付き）
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}
```

---

## 5. API仕様

### 5.1 エンドポイント一覧

| Method | Path | 説明 | 認証 |
|--------|------|------|------|
| GET | `/` | APIルート（ヘルスチェック） | 不要 |
| GET | `/works` | 全プロジェクト取得 | 不要 |
| GET | `/works/{work_id}` | プロジェクト詳細取得 | 不要 |
| GET | `/skills` | スキル一覧取得 | 不要 |
| GET | `/skills/categories` | スキルカテゴリ取得 | 不要 |
| GET | `/about` | プロフィール取得 | 不要 |
| GET | `/hero/introduction` | ヒーロー自己紹介取得 | 不要 |
| GET | `/hero/timeline` | タイムライン取得 | 不要 |
| POST | `/contact` | お問い合わせ送信 | 不要 |

### 5.2 共通仕様

**Base URL:**
- 開発: `http://localhost:8000`
- 本番: TBD

**リクエストヘッダー:**
```
Content-Type: application/json
Accept: application/json
```

**レスポンス形式:**
- 成功時: JSON（各エンドポイントのレスポンスモデル参照）
- エラー時:
  ```json
  {
    "detail": "エラーメッセージ"
  }
  ```

**HTTPステータスコード:**
- 200: 成功
- 404: リソース未発見
- 422: バリデーションエラー
- 500: サーバーエラー

### 5.3 エンドポイント詳細

#### GET /works
**説明:** 全プロジェクト一覧を取得

**レスポンス:**
```json
{
  "works": [
    {
      "id": "work-1",
      "title": "Portfolio Website",
      "description": "モダンなポートフォリオサイト...",
      "thumbnail": "/works/portfolio.png",
      "category": "Web Development",
      "technologies": ["Next.js", "React", "TypeScript"],
      "screenshots": [],
      "links": {
        "github": "https://github.com/...",
        "demo": null,
        "blog": null
      }
    }
  ]
}
```

#### POST /contact
**説明:** お問い合わせ送信

**リクエストボディ:**
```json
{
  "name": "山田太郎",
  "email": "taro@example.com",
  "subject": "お仕事の相談",
  "message": "ご連絡させていただきたく..."
}
```

**レスポンス:**
```json
{
  "success": true,
  "message": "お問い合わせを受け付けました。ありがとうございます。"
}
```

---

## 6. UI/UXデザイン要件

### 6.1 デザインコンセプト
**テーマ:** "Modern Tech & Minimalist Precision"
**参考サイト:** Linear, Vercel, Stripe

### 6.2 デザインシステム

#### カラーパレット
```css
/* Primary Colors */
--background: zinc-900
--foreground: zinc-50
--accent-blue: #3b82f6
--accent-purple: #a855f7

/* Semantic Colors */
--success: #10b981
--error: #ef4444
--warning: #f59e0b
```

#### タイポグラフィ
- **フォント:** Inter, sans-serif
- **見出し:** font-bold, tracking-tight
- **本文:** font-normal, leading-relaxed

#### スペーシング
- Tailwind CSS デフォルトスケール（4px単位）

### 6.3 デザインパターン

#### Bento Grid
- 不均等なグリッドレイアウト
- カードサイズのバリエーション（1x1, 2x1, 1x2等）
- 適切な余白（gap-4, gap-6）

#### Glassmorphism
- `backdrop-blur-md`
- `bg-white/10` または `bg-zinc-900/80`
- 微細なボーダー（`border-white/20`）

#### Micro-interactions
- ホバー時のスケール変化（`hover:scale-105`）
- フォーカス時のリング表示（`focus:ring-2`）
- スムーズなトランジション（`transition-all duration-300`）

#### アニメーション（Framer Motion）
- ページロード時のフェードイン
- スクロール連動アニメーション（`useScroll`, `useTransform`）
- カウンターアニメーション（スキルレベル表示）
- タイムラインのステップアニメーション

---

## 7. 技術制約・前提条件

### 7.1 技術スタック固定要件
- Frontend: Next.js 15 (App Router必須)
- Backend: FastAPI (Python 3.12+)
- Database: Supabase (PostgreSQL)
- UI: Tailwind CSS 4 + Radix UI
- Animation: Framer Motion

### 7.2 開発環境
- Node.js: v18以上推奨
- Python: 3.12以上
- Package Manager: npm (frontend), pip (backend)

### 7.3 Mock Data対応
- 環境変数 `USE_MOCK_DATA=True` でSupabase未接続時も動作
- 全APIエンドポイントにMockデータフォールバック実装
- 開発初期段階でもフロントエンド開発可能

---

## 8. 今後の拡張性

### 8.1 Phase 2（今後実装予定）
- ブログ機能（MDX、Notion API連携）
- ダークモード/ライトモードトグル
- 多言語対応（i18n: 日本語・英語）
- アナリティクス統合（Vercel Analytics, Google Analytics）
- OGP画像動的生成

### 8.2 Phase 3（長期的検討）
- CMSヘッドレス化（Contentful, Sanity）
- Webhookベース自動デプロイ
- A/Bテスト基盤
- リアルタイムチャット機能

---

## 9. 付録

### 9.1 用語集
| 用語 | 説明 |
|------|------|
| Bento Grid | 不均等サイズのカードレイアウト（日本の弁当箱に由来） |
| Glassmorphism | ガラス質な透明感・ブラー効果のデザイン手法 |
| LCP | Largest Contentful Paint（最大コンテンツの描画時間） |
| SSR | Server Side Rendering |
| RSC | React Server Components |

### 9.2 関連ドキュメント
- `/CLAUDE.md` - AI開発者向け指示書
- `/README.md` - プロジェクト概要
- `/.claude/settings.local.json` - Claude Code設定

### 9.3 変更履歴
| バージョン | 日付 | 変更内容 |
|-----------|------|----------|
| 1.0.0 | 2025-12-20 | 初版作成 |
