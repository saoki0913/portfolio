# CLAUDE.md

このファイルは、本リポジトリで作業するAI（Claude）に対する指示書です。

## 📋 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [開発原則](#開発原則)
3. [ドキュメント構造](#ドキュメント構造)
4. [タスク別クイックリファレンス](#タスク別クイックリファレンス)
5. [よくある落とし穴](#よくある落とし穴)
6. [開発コマンド](#開発コマンド)
7. [環境変数](#環境変数)

---

## プロジェクト概要

Next.js 15 (App Router) + FastAPI のフルスタックポートフォリオサイト。
**「モダンなWebエンジニアリングの実践場」** として、高い技術力とUXを両立させる。

### デザインコンセプト

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

### 技術スタック

| Layer | Technologies |
|-------|--------------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4, Framer Motion, Radix UI, Lucide React |
| Backend | FastAPI, Python 3.12+, Pydantic v2, SQLAlchemy 2.0 |
| Database | Supabase (PostgreSQL), Redis (キャッシュ) |
| Tooling | ESLint, Prettier, Pytest, Axios |

---

## 開発原則

| 原則 | 内容 |
|------|------|
| 自律的エラー解決 | 即座に報告せず、ログ分析→原因特定→修正→テストまで自律的に実行 |
| 技術的妥協の排除 | 型安全性（TypeScript/Pydantic）、スケーラビリティ、パフォーマンスを常に意識 |
| コンテキスト保持 | 既存アーキテクチャ・UIの一貫性を破壊しないよう全体を横断確認 |
| ドキュメント優先 | 実装前に該当ドキュメントを確認し、一貫性を保つ |
| 型安全性の徹底 | TypeScript ↔ Pydantic の型定義を常に同期 |

---

## ドキュメント構造

```
.claude/
├── 00_project/                    # プロジェクト要件（2個）
│   ├── 01_appcadia_concept_requirements.md  # 機能要件定義書
│   └── 02_inception_deck.md                 # インセプションデッキ
├── 01_development_docs/           # 技術設計ドキュメント（15個）
│   ├── 01_architecture_design.md            # アーキテクチャ設計
│   ├── 02_database_design.md                # データベース設計
│   ├── 03_api_design.md                     # API設計
│   ├── 04_screen_transition_design.md       # 画面遷移設計
│   ├── 05_seo_requirements.md               # SEO要件
│   ├── 06_error_handling_design.md          # エラーハンドリング設計
│   ├── 07_type_definitions.md               # 型定義
│   ├── 08_development_setup.md              # 開発環境セットアップ
│   ├── 09_test_strategy.md                  # テスト戦略
│   ├── 10_frontend_design.md                # フロントエンド設計
│   ├── 11_cicd_design.md                    # CI/CD設計
│   ├── 12_e2e_test_design.md                # E2Eテスト設計
│   ├── 13_security_design.md                # セキュリティ設計
│   ├── 14_performance_optimization.md       # パフォーマンス最適化
│   └── 15_performance_monitoring.md         # パフォーマンス監視
├── 02_design_system/              # デザインシステム（5個）
│   ├── 00_basic_design.md                   # 基本デザイン
│   ├── 01_design_principles.md              # デザイン原則
│   ├── 02_component_design.md               # コンポーネント設計
│   ├── 03_animation_system.md               # アニメーションシステム
│   └── 04_layout_system.md                  # レイアウトシステム
└── 03_library_docs/               # ライブラリ対策（4個）
    ├── 01_radix_ui_patterns.md              # Radix UIパターン
    ├── 02_supabase_patterns.md              # Supabaseパターン
    ├── 03_framer_motion_patterns.md         # Framer Motionパターン
    └── 04_nextjs_app_router_patterns.md     # Next.js App Routerパターン
```

---

## タスク別クイックリファレンス

### 🎯 新しい機能を追加する場合

1. **機能要件を確認**: `.claude/00_project/01_appcadia_concept_requirements.md`
2. **アーキテクチャ確認**: `.claude/01_development_docs/01_architecture_design.md`
3. **API設計**: `.claude/01_development_docs/03_api_design.md`
4. **型定義追加**: `.claude/01_development_docs/07_type_definitions.md`（Backend + Frontend同時更新）
5. **デザインシステム参照**: `.claude/02_design_system/00_basic_design.md`
6. **実装**
7. **テスト**: `.claude/01_development_docs/09_test_strategy.md`

### 🗄️ 新しいAPIエンドポイントを作成する場合

**参照ドキュメント**:
- `.claude/01_development_docs/03_api_design.md` - APIエンドポイント設計
- `.claude/01_development_docs/07_type_definitions.md` - 型定義（Pydantic）
- `.claude/01_development_docs/06_error_handling_design.md` - エラーハンドリング
- `.claude/01_development_docs/02_database_design.md` - データベーススキーマ

**手順**:
1. Pydanticスキーマ定義（`backend/app/schemas/`）
2. APIルーター実装（`backend/app/api/`）
3. Mock Dataフォールバック実装
4. Swagger UI（`/docs`）で確認
5. Frontend TypeScript型定義追加（`frontend/src/lib/types/`）

### 🎨 新しいUIコンポーネントを作成する場合

**参照ドキュメント**:
- `.claude/02_design_system/00_basic_design.md` - デザインの基本
- `.claude/02_design_system/01_design_principles.md` - カラー、タイポグラフィ
- `.claude/02_design_system/02_component_design.md` - コンポーネントパターン
- `.claude/03_library_docs/01_radix_ui_patterns.md` - Radix UI使用方法

**手順**:
1. デザインシステムに従ったスタイリング（Tailwind CSS）
2. Radix UIベースコンポーネント（必要に応じて）
3. アクセシビリティ対応（ARIA属性、キーボードナビゲーション）
4. `components/ui/` または `components/sections/` に配置

### 🔄 データベーススキーマを変更する場合

**参照ドキュメント**:
- `.claude/01_development_docs/02_database_design.md` - データベース設計
- `.claude/01_development_docs/07_type_definitions.md` - 型定義同期

**手順**:
1. `.claude/01_development_docs/02_database_design.md` を更新
2. Supabase SQLエディタでマイグレーション実行
3. Pydanticスキーマ更新（`backend/app/schemas/`）
4. TypeScript型定義更新（`frontend/src/lib/types/`）
5. `.claude/01_development_docs/07_type_definitions.md` を更新

### 🐛 エラーハンドリングを追加する場合

**参照ドキュメント**:
- `.claude/01_development_docs/06_error_handling_design.md`

**手順**:
1. Backend: `HTTPException` 使用
2. Frontend: Axios インターセプターでキャッチ
3. ユーザー向けメッセージ作成
4. 開発者向けログ出力

### ⚡ パフォーマンス最適化を行う場合

**参照ドキュメント**:
- `.claude/01_development_docs/14_performance_optimization.md`
- `.claude/01_development_docs/15_performance_monitoring.md`

**チェック項目**:
- [ ] Server Components活用
- [ ] 画像最適化（next/image）
- [ ] 並列データフェッチング（Promise.all）
- [ ] コード分割（dynamic import）
- [ ] Lighthouse Score 90点以上

### 🔒 セキュリティ対策を追加する場合

**参照ドキュメント**:
- `.claude/01_development_docs/13_security_design.md`

**チェック項目**:
- [ ] 入力検証（Pydantic + Zod）
- [ ] XSS対策（React自動エスケープ）
- [ ] CORS設定確認
- [ ] 環境変数に機密情報（`.env`をGit管理しない）
- [ ] 依存関係の脆弱性スキャン（npm audit, pip-audit）

### 🎬 アニメーションを追加する場合

**参照ドキュメント**:
- `.claude/02_design_system/03_animation_system.md`
- `.claude/03_library_docs/03_framer_motion_patterns.md`

**原則**:
- transform/opacity優先（GPU加速）
- `useReducedMotion` 対応
- デュレーション: 0.3〜0.5秒推奨

---

## よくある落とし穴

### ⚠️ 型定義の不一致

**問題**: Frontend TypeScript型 と Backend Pydantic型がずれる

**対策**:
1. `.claude/01_development_docs/07_type_definitions.md` を常にマスターとして更新
2. 型変更時は必ずBackend + Frontend両方を同時更新
3. Optional型、List型、Union型の一致を確認

**チェック**:
```bash
# Frontend型チェック
cd frontend && npm run tsc --noEmit

# Backend起動してSwagger UI確認
http://localhost:8000/docs
```

### ⚠️ Server ComponentsとClient Componentsの混同

**問題**: Server ComponentでuseStateを使用、Client ComponentでデータフェッチなしでServer側データにアクセス

**対策**:
- **Server Component（デフォルト）**: データフェッチ、静的コンテンツ
- **Client Component（'use client'）**: イベントハンドラー、React Hooks、Framer Motion

**参照**: `.claude/03_library_docs/04_nextjs_app_router_patterns.md`

### ⚠️ Mock ModeとSupabase Modeの切り替え忘れ

**問題**: Supabase接続時に`USE_MOCK_DATA=True`のまま、またはその逆

**対策**:
```bash
# 開発初期（Supabase未設定）
USE_MOCK_DATA=True

# Supabase設定後
USE_MOCK_DATA=False
```

### ⚠️ CORS エラー

**問題**: Frontend（localhost:3000）からBackend（localhost:8000）へのリクエストがブロック

**対策**:
```python
# backend/app/main.py
allow_origins=["http://localhost:3000"]  # 開発環境
# 本番環境では実際のドメインを指定
```

### ⚠️ 画像最適化の忘れ

**問題**: `<img>` タグ使用で画像最適化されない

**対策**:
```tsx
// 悪い例
<img src="/profile.jpg" alt="Profile" />

// 良い例
import Image from 'next/image';
<Image src="/profile.jpg" alt="Profile" width={400} height={400} />
```

### ⚠️ Framer Motionのパフォーマンス問題

**問題**: width/height アニメーションでreflow発生

**対策**:
```tsx
// 悪い例（reflow発生）
<motion.div animate={{ width: '100px', height: '100px' }} />

// 良い例（GPU加速）
<motion.div animate={{ x: 100, y: 100, opacity: 0.5 }} />
```

---

## 開発コマンド

```bash
# Frontend (frontend/)
npm run dev      # 開発サーバー (Turbopack) → http://localhost:3000
npm run build    # 本番ビルド
npm run lint     # ESLint
npm test         # Jest + React Testing Library

# Backend (backend/)
cd backend
source venv/bin/activate  # 仮想環境有効化
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000  # 開発サーバー → http://localhost:8000/docs
pytest           # テスト実行

# 両方起動
# ターミナル1: cd backend && uvicorn app.main:app --reload --port 8000
# ターミナル2: cd frontend && npm run dev
```

---

## 環境変数

### Backend (backend/.env)

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

### Frontend (frontend/.env.local)

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 重要なキーファイル

| パス | 役割 |
|------|------|
| `backend/app/main.py` | FastAPIエントリーポイント、ルーター登録 |
| `backend/app/database.py` | Supabaseクライアント（Mock fallback対応） |
| `backend/app/core/config.py` | Pydantic設定、`.env`読み込み |
| `backend/app/api/` | ドメイン別APIルーター |
| `backend/app/schemas/` | Pydanticリクエスト/レスポンスモデル |
| `frontend/src/lib/api/client.ts` | Axiosインスタンス、エラーハンドリング |
| `frontend/src/lib/api/` | ドメイン別APIクライアント |
| `frontend/src/lib/types/` | TypeScript型定義 |
| `frontend/src/components/sections/` | ページセクション (Hero, About, Works, Skills, Contact) |
| `frontend/src/components/ui/` | Radix UIベース共通コンポーネント |

---

## APIエンドポイント一覧

| Method | Path | 説明 | 参照ドキュメント |
|--------|------|------|-----------------|
| GET | `/` | API ヘルスチェック | `.claude/01_development_docs/03_api_design.md` |
| GET | `/works` | 全プロジェクト取得 | `.claude/01_development_docs/03_api_design.md` |
| GET | `/works/{id}` | プロジェクト詳細取得 | `.claude/01_development_docs/03_api_design.md` |
| GET | `/skills` | スキル一覧取得（カテゴリ付き） | `.claude/01_development_docs/03_api_design.md` |
| GET | `/skills/categories` | スキルカテゴリ名一覧 | `.claude/01_development_docs/03_api_design.md` |
| GET | `/about` | プロフィール・学歴・職歴取得 | `.claude/01_development_docs/03_api_design.md` |
| GET | `/hero/introduction` | ヒーロー自己紹介取得 | `.claude/01_development_docs/03_api_design.md` |
| GET | `/hero/timeline` | タイムライン取得 | `.claude/01_development_docs/03_api_design.md` |
| POST | `/contact` | お問い合わせ送信 | `.claude/01_development_docs/03_api_design.md` |

---

## まとめ

このCLAUDE.mdファイルは、プロジェクト全体の **司令塔** として機能します。

**開発時の流れ**:
1. タスクを受け取る
2. 該当するドキュメントを参照
3. ドキュメントに従って実装
4. 一貫性を保つ

**迷ったら**:
- まず`.claude/00_project/01_appcadia_concept_requirements.md`で機能要件確認
- 次に該当する技術ドキュメント（`.claude/01_development_docs/`）を確認
- デザイン関連は`.claude/02_design_system/`を確認
- ライブラリの使い方は`.claude/03_library_docs/`を確認

すべてのドキュメントが連携し、一貫性のある高品質なポートフォリオサイトを実現します。
