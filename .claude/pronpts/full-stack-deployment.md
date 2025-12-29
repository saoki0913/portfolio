```
あなたは私のポートフォリオサイトのフルスタック開発を担当します。
Supabase MCP、GitHub MCP、Vercel MCP、Render MCPを活用して、問題の診断から修正、デプロイまで自律的に完了してください。
私への確認は最小限にし、可能な限り自律的に判断して作業を進めてください。

---

## 目標
1. Supabaseからすべてのデータ（Works、Skills、About、Hero、Contact等、存在するすべてのテーブル）を正しく取得できるようにする
2. ポートフォリオサイトのコンテンツをアップロードされた資料に基づいて充実させる（Supabaseにデータを投入）
3. フロントエンド：Supabaseからすべてのデータを正しく取得し、本番環境（Vercel）に反映する
4. バックエンド：既存のクリーンアーキテクチャ設計に従って実装を確認・修正し、本番環境（Render）にデプロイする
5. フロントエンドとバックエンドが正しく連携して動作することを確認する
6. .claudeディレクトリを含むすべての変更をGitHubにプッシュする
7. GitHub Actionsワークフローが正常に実行され、フロントエンド（Vercel）とバックエンド（Render）の両方のデプロイが成功することを確認する
8. 修正履歴とチェックリストをCHANGELOG.mdとPROGRESS.mdに記録する（バージョン番号を明記）
9. 使用されていない不要なコード、ファイル、ディレクトリを削除してプロジェクトをクリーンアップする

---

## 採用アーキテクチャ

### バックエンドのクリーンアーキテクチャ構成

```
backend/
└── app/
    ├── router/          # プレゼンテーション層（HTTPリクエスト/レスポンス処理）
    │   ├── works.py
    │   ├── skills.py
    │   ├── about.py
    │   ├── hero.py
    │   └── contact.py
    ├── usecase/         # アプリケーション層（ビジネスロジックのオーケストレーション）
    │   ├── work_usecase.py
    │   ├── skill_usecase.py
    │   ├── about_usecase.py
    │   ├── hero_usecase.py
    │   └── contact_usecase.py
    ├── domain/          # ドメイン層（ビジネスルール定義）
    │   ├── entity/      # エンティティ（Pydantic BaseModel）
    │   │   ├── work.py
    │   │   ├── skill.py
    │   │   ├── about.py
    │   │   ├── hero.py
    │   │   └── contact.py
    │   └── i_repository/# リポジトリインターフェース（ABC）
    │       ├── i_work_repository.py
    │       ├── i_skill_repository.py
    │       ├── i_about_repository.py
    │       ├── i_hero_repository.py
    │       └── i_contact_repository.py
    ├── infra/           # インフラストラクチャ層（外部システム接続）
    │   └── repository/  # リポジトリ実装（Supabase）
    │       ├── supabase_work_repository.py
    │       ├── supabase_skill_repository.py
    │       ├── supabase_about_repository.py
    │       ├── supabase_hero_repository.py
    │       └── supabase_contact_repository.py
    ├── dependencies/    # 依存性注入
    │   └── dependency_injector.py
    └── main.py          # FastAPIエントリーポイント
```

### 各層の責務
1. **Router層**: HTTPリクエスト/レスポンス処理、バリデーション、UseCaseの呼び出し
2. **UseCase層**: ビジネスロジックのオーケストレーション、リポジトリの協調
3. **Domain層**: エンティティ定義、リポジトリインターフェース定義
4. **Infrastructure層**: Supabaseとの接続、データアクセス実装

### 依存性の流れ（依存性逆転の原則）
```
Router (依存) → UseCase (依存) → IRepository (インターフェース)
                                        ↑
                                        │ 実装
                                        │
                              SupabaseRepository (Infrastructure)
```

---

## パート1: 現状診断

### 1.1 プロジェクト構成の確認
- フロントエンド・バックエンドのディレクトリ構成を確認
- 上記のクリーンアーキテクチャ構成と一致しているか確認
- 環境変数の設定状況を確認
- .claudeディレクトリの内容を確認
- .github/workflowsディレクトリのワークフロー設定を確認

### 1.2 Git/GitHub状態の確認
- 現在のブランチを確認
- コミットされていない変更がないか確認（.claudeディレクトリ含む）
- .gitignoreの内容を確認し、.claudeがignoreされていないことを確認
- リモートとローカルの差分を確認
- すべての変更がpush済みか確認

### 1.3 GitHub Actionsワークフローの確認
- .github/workflows/内のワークフローファイルを確認
- ワークフローのトリガー条件を確認（push, pull_request等）
- フロントエンド（Vercel）デプロイのジョブ設定を確認
- バックエンド（Render）デプロイのジョブ設定を確認
- 必要なシークレット（VERCEL_TOKEN, RENDER_API_KEY等）が設定されているか確認

### 1.4 Supabaseの状態確認（Supabase MCPを使用）
- 接続しているSupabaseプロジェクトを確認
- すべてのテーブルを一覧表示（works, skills, about, hero, contact等）
- 各テーブルのスキーマ（カラム名、型、制約）を確認
- 各テーブルにデータが存在するか確認
- RLS（Row Level Security）ポリシーをすべて確認
- データ取得テストを実行し、正しくデータが取得できることを確認

### 1.5 デプロイ状態の確認
- Vercel MCP：フロントエンドのデプロイ状況、ビルドログ、環境変数を確認
- Render MCP：バックエンドのデプロイ状況、ビルドログ、環境変数を確認

### 1.6 既存のCHANGELOG.mdとPROGRESS.mdの確認
- ファイルが存在するか確認
- 存在する場合は内容を確認し、続きから記録
- 存在しない場合は新規作成

---

## パート2: Supabaseデータの充実化

### 2.1 テーブル構造の確認と修正
Supabase MCPを使用して：
- 既存のテーブル構造を確認（works, skills, about, hero, contact）
- 上記のコンテンツを格納するために必要なカラムが存在するか確認
- 不足しているカラムがあれば追加

### 2.2 コンテンツデータの投入
ローカルで実装済かつSupabeseに存在しない内容をSupabaseに投入：

### 2.3 RLSポリシーの確認と修正
- 読み取り許可が必要なテーブルはanonアクセスを許可
- ポリシーが適切に設定されているか確認
- 必要に応じてポリシーを修正

### 2.4 データ取得テスト
- 投入したすべてのデータが正しく取得できることを確認

---

## パート3: バックエンドのクリーンアーキテクチャ確認・修正

### 3.1 ディレクトリ構成の確認
上記のアーキテクチャ設計に従っているか確認：
- router/：各エンドポイントのルーター
- usecase/：各機能のユースケース
- domain/entity/：Pydanticエンティティ
- domain/i_repository/：リポジトリインターフェース（ABC）
- infra/repository/：Supabaseリポジトリ実装
- dependencies/：依存性注入設定

### 3.2 各層の実装確認

#### Router層の確認
- FastAPI RouterがUseCaseを呼び出しているか
- Dependsによる依存性注入が正しく設定されているか
- レスポンスモデルが正しく設定されているか

#### UseCase層の確認
- IRepositoryインターフェースに依存しているか（具体実装に依存していないか）
- ビジネスロジックが適切に実装されているか

#### Domain層の確認
- エンティティがPydantic BaseModelで定義されているか
- リポジトリインターフェースがABCで定義されているか

#### Infrastructure層の確認
- リポジトリ実装がIRepositoryを継承しているか
- Supabaseクライアントが正しく使用されているか

### 3.3 依存性注入の確認
- dependency_injector.pyが正しく設定されているか
- Supabaseクライアントの取得が正しいか
- 各UseCaseへのRepository注入が正しいか

### 3.4 エラーハンドリングの確認
- HTTPExceptionが適切に発生しているか
- グローバル例外ハンドラーが設定されているか

### 3.5 不足している実装の追加
- 上記の設計に不足しているファイルがあれば追加
- 既存のコードがアーキテクチャに沿っていない場合は修正

---

## パート4: フロントエンドの修正

### 4.1 Supabase接続の確認と修正
- Supabaseクライアントの初期化を確認
- すべてのデータ取得ロジックを確認・修正
- 型定義の整合性を確保

### 4.2 バックエンドAPIとの連携
- バックエンドAPIエンドポイントへの接続を確認
- 必要に応じてAPI呼び出しを修正

### 4.3 コンポーネントの修正
- すべてのセクション（Works, Skills, About, Hero, Contact）のコンポーネントを確認
- 新しく投入したデータが正しく表示されるよう修正
- データ取得とレンダリングロジックを修正
- ローディング状態とエラー状態の実装

---

## パート5: ローカル動作確認

### 5.1 バックエンドの確認
- バックエンドサーバーを起動
- 各APIエンドポイントが正しくデータを返すことを確認
  - GET /works
  - GET /works/{work_id}
  - GET /skills
  - GET /about
  - GET /hero
  - POST /contact
- Supabaseからデータが正しく取得できていることを確認
- 新しく投入したコンテンツが正しく取得できることを確認

### 5.2 フロントエンドの確認
- フロントエンドサーバーを起動
- すべてのセクションが正しく表示されることを確認
- Supabaseからのデータが正しく表示されていることを確認
- 新しく投入したコンテンツ（Works, Hero/Timeline, Skills）が正しく表示されることを確認
- コンソールにエラーがないことを確認

---

## パート6: 不要なコード・ファイル・ディレクトリの削除

### 6.1 不要ファイルの特定

以下の観点で不要なファイル・ディレクトリを特定する：

#### コード関連
- 使用されていないコンポーネント
- 使用されていないユーティリティ関数
- 使用されていない型定義
- 使用されていないAPI関連ファイル
- 古いバージョンのファイル（.old, .backup, .bak等）
- コメントアウトされた大量のコード

#### 設定関連
- 使用されていない設定ファイル
- 重複した設定ファイル
- 古い環境設定ファイル

#### ビルド・キャッシュ関連
- node_modules以外のキャッシュディレクトリ
- ビルド成果物（dist/, build/, .next/等）※.gitignoreで管理されているか確認
- ログファイル

#### その他
- 空のディレクトリ
- テスト用の一時ファイル
- サンプルファイル（使用していない場合）
- ドキュメント以外のREADME（重複している場合）

### 6.2 依存関係の確認

#### 未使用のnpm/yarnパッケージを特定
- package.jsonのdependenciesとdevDependenciesを確認
- 実際にimport/requireされていないパッケージをリストアップ
- 不要なパッケージを削除

#### 未使用のインポートを特定
- 各ファイルで使用されていないimport文を特定
- 不要なimport文を削除

### 6.3 削除の実行

#### 削除前の確認
- 削除対象ファイル・ディレクトリの一覧を作成
- 各ファイルが本当に使用されていないことを再確認
- 削除対象をCHANGELOG.mdの「Removed」セクションに記録

#### 削除の実行
- 特定した不要ファイル・ディレクトリを削除
- 不要なnpmパッケージをアンインストール（npm uninstall または yarn remove）
- 未使用のimport文を削除

### 6.4 削除後の動作確認
- フロントエンドが正常にビルドできることを確認
- バックエンドが正常にビルドできることを確認
- ローカルで正常に動作することを確認
- TypeScriptの型エラーがないことを確認
- ESLint/Prettierのエラーがないことを確認

---

## パート7: 修正履歴とチェックリストの作成・更新

### 7.1 CHANGELOG.mdの作成・更新

プロジェクトルート（/Users/saoki/work/my_apps/portfolio/）に以下の形式でCHANGELOG.mdを作成または更新する：

```markdown
# Changelog

すべての重要な変更はこのファイルに記録されます。

フォーマットは [Keep a Changelog](https://keepachangelog.com/ja/1.0.0/) に基づいています。
バージョニングは [Semantic Versioning](https://semver.org/lang/ja/) に従います。

## [Unreleased]

## [X.X.X] - YYYY-MM-DD

### Added（追加）
- 新機能や新ファイルの追加
- Supabaseに投入した新しいコンテンツ

### Changed（変更）
- 既存機能の変更

### Fixed（修正）
- バグ修正

### Removed（削除）
- 削除されたファイル・ディレクトリ
- 削除された未使用コード
- 削除された未使用パッケージ

### Security（セキュリティ）
- セキュリティに関する変更

### Infrastructure（インフラ）
- デプロイ、環境変数、設定の変更
- Vercelデプロイバージョン
- Renderデプロイバージョン
- Supabaseスキーマ変更
```

### 7.2 PROGRESS.mdの作成・更新

プロジェクトルート（/Users/saoki/work/my_apps/portfolio/）に以下の形式でPROGRESS.mdを作成または更新する：

```markdown
# 開発進捗チェックリスト

最終更新: YYYY-MM-DD HH:MM

## 現在のバージョン: X.X.X

---

## 全体進捗サマリー

| カテゴリ | 完了 | 進行中 | 未着手 | 進捗率 |
|---------|-----|-------|-------|-------|
| バックエンド | X | X | X | XX% |
| フロントエンド | X | X | X | XX% |
| Supabase | X | X | X | XX% |
| インフラ/デプロイ | X | X | X | XX% |
| CI/CD | X | X | X | XX% |
| クリーンアップ | X | X | X | XX% |
| ドキュメント | X | X | X | XX% |

---

## Supabase

### テーブル
- [ ] / [x] worksテーブル（データ: X件）
- [ ] / [x] skillsテーブル（データ: X件）
- [ ] / [x] aboutテーブル（データ: X件）
- [ ] / [x] heroテーブル（データ: X件）
- [ ] / [x] contactテーブル（設定確認）

### コンテンツ投入
- [ ] / [x] RAGシステムプロジェクト
- [ ] / [x] スケジュール管理システムプロジェクト
- [ ] / [x] ポートフォリオサイトプロジェクト
- [ ] / [x] インテリジェントフォース経験
- [ ] / [x] EQUES経験
- [ ] / [x] スキル一覧
- [ ] / [x] 研究内容（About）

### RLSポリシー
- [ ] / [x] worksテーブルのRLS設定
- [ ] / [x] skillsテーブルのRLS設定
- [ ] / [x] aboutテーブルのRLS設定
- [ ] / [x] heroテーブルのRLS設定
- [ ] / [x] contactテーブルのRLS設定

### データ取得確認
- [ ] / [x] worksデータ取得成功
- [ ] / [x] skillsデータ取得成功
- [ ] / [x] aboutデータ取得成功
- [ ] / [x] heroデータ取得成功

---

## バックエンド（クリーンアーキテクチャ）

### Router層
- [ ] / [x] works.py
- [ ] / [x] skills.py
- [ ] / [x] about.py
- [ ] / [x] hero.py
- [ ] / [x] contact.py

### UseCase層
- [ ] / [x] work_usecase.py
- [ ] / [x] skill_usecase.py
- [ ] / [x] about_usecase.py
- [ ] / [x] hero_usecase.py
- [ ] / [x] contact_usecase.py

### Domain層（Entity）
- [ ] / [x] work.py
- [ ] / [x] skill.py
- [ ] / [x] about.py
- [ ] / [x] hero.py
- [ ] / [x] contact.py

### Domain層（IRepository）
- [ ] / [x] i_work_repository.py
- [ ] / [x] i_skill_repository.py
- [ ] / [x] i_about_repository.py
- [ ] / [x] i_hero_repository.py
- [ ] / [x] i_contact_repository.py

### Infrastructure層（Repository実装）
- [ ] / [x] supabase_work_repository.py
- [ ] / [x] supabase_skill_repository.py
- [ ] / [x] supabase_about_repository.py
- [ ] / [x] supabase_hero_repository.py
- [ ] / [x] supabase_contact_repository.py

### 依存性注入
- [ ] / [x] dependency_injector.py

### API動作確認
- [ ] / [x] GET /works
- [ ] / [x] GET /works/{work_id}
- [ ] / [x] GET /skills
- [ ] / [x] GET /about
- [ ] / [x] GET /hero
- [ ] / [x] POST /contact

---

## フロントエンド

### Supabase連携
- [ ] / [x] Supabaseクライアント初期化
- [ ] / [x] 環境変数設定

### コンポーネント
- [ ] / [x] Heroセクション
- [ ] / [x] Aboutセクション
- [ ] / [x] Worksセクション
- [ ] / [x] Skillsセクション
- [ ] / [x] Contactセクション

---

## クリーンアップ

### 不要ファイル・ディレクトリの削除
- [ ] / [x] 未使用コンポーネントの削除
- [ ] / [x] 未使用ユーティリティの削除
- [ ] / [x] 未使用型定義の削除
- [ ] / [x] 古いバックアップファイルの削除
- [ ] / [x] 空ディレクトリの削除

### 不要パッケージの削除
- [ ] / [x] 未使用npm/yarnパッケージの特定
- [ ] / [x] 未使用パッケージのアンインストール
- [ ] / [x] package.jsonの整理

### コード整理
- [ ] / [x] 未使用import文の削除
- [ ] / [x] コメントアウトされた不要コードの削除
- [ ] / [x] 重複コードの整理

### 削除後の確認
- [ ] / [x] フロントエンドビルド成功
- [ ] / [x] バックエンドビルド成功
- [ ] / [x] ローカル動作確認
- [ ] / [x] 型エラーなし
- [ ] / [x] Lintエラーなし

---

## CI/CD（GitHub Actions）

### ワークフロー設定
- [ ] / [x] ワークフローファイル存在確認
- [ ] / [x] トリガー条件設定（push/pull_request）
- [ ] / [x] フロントエンドデプロイジョブ設定
- [ ] / [x] バックエンドデプロイジョブ設定

### シークレット設定
- [ ] / [x] VERCEL_TOKEN
- [ ] / [x] VERCEL_ORG_ID
- [ ] / [x] VERCEL_PROJECT_ID
- [ ] / [x] RENDER_API_KEY
- [ ] / [x] RENDER_SERVICE_ID

### ワークフロー実行確認
- [ ] / [x] ワークフロー正常トリガー
- [ ] / [x] フロントエンドデプロイジョブ成功
- [ ] / [x] バックエンドデプロイジョブ成功
- [ ] / [x] 全ジョブ完了

---

## インフラ/デプロイ

### GitHub
- [ ] / [x] すべての変更をコミット
- [ ] / [x] .claudeディレクトリをコミット
- [ ] / [x] mainブランチにプッシュ

### Vercel（フロントエンド）
- [ ] / [x] GitHub Actions経由でデプロイ成功
- [ ] / [x] 環境変数設定
- [ ] / [x] 本番環境動作確認
- デプロイバージョン: X.X.X
- デプロイ日時: YYYY-MM-DD HH:MM

### Render（バックエンド）
- [ ] / [x] GitHub Actions経由でデプロイ成功
- [ ] / [x] 環境変数設定
- [ ] / [x] 本番環境動作確認
- デプロイバージョン: X.X.X
- デプロイ日時: YYYY-MM-DD HH:MM

### Supabase
- スキーマバージョン: X.X.X
- 最終更新日時: YYYY-MM-DD HH:MM

---

## ドキュメント

- [ ] / [x] CHANGELOG.md更新
- [ ] / [x] PROGRESS.md更新

---

## 本番環境URL

- フロントエンド: （URLを記載）
- バックエンド: （URLを記載）

---

## デプロイバージョン履歴

| 日時 | バージョン | Vercel | Render | Supabase | コミット |
|-----|----------|--------|--------|----------|---------|
| YYYY-MM-DD HH:MM | X.X.X | ✓/✗ | ✓/✗ | ✓/✗ | xxxxxxx |

---

## 削除したファイル・ディレクトリ一覧

| パス | 種別 | 削除理由 |
|-----|-----|---------|

## 削除したパッケージ一覧

| パッケージ名 | 削除理由 |
|------------|---------|

---

## GitHub Actions実行履歴

| 日時 | コミット | ワークフロー | フロントエンド | バックエンド | 結果 |
|-----|---------|------------|--------------|-------------|-----|
| YYYY-MM-DD HH:MM | xxxxxxx | deploy.yml | ✓/✗ | ✓/✗ | 成功/失敗 |

---

## 既知の問題・課題

| 問題 | 優先度 | ステータス | 備考 |
|-----|-------|----------|-----|

---

## 作業履歴

| 日付 | 作業内容 | 担当 | 備考 |
|-----|---------|-----|-----|
```

---

## パート8: GitHubへのプッシュとGitHub Actionsによるデプロイ

### 8.1 .gitignoreの確認と修正
- .claudeディレクトリが.gitignoreに含まれていないことを確認
- 含まれている場合は削除して、.claudeをトラッキング対象にする
- ただし、機密情報（APIキー等）を含むファイルはignoreする
- CHANGELOG.mdとPROGRESS.mdがignoreされていないことを確認

### 8.2 すべての変更をコミット・プッシュ（GitHub MCPを使用）
- 変更されたすべてのファイルを確認（.claude、CHANGELOG.md、PROGRESS.md含む）
- 削除されたファイルも含めて確認
- 適切なコミットメッセージでコミット（バージョン番号を含める）
- mainブランチにプッシュ
- プッシュが成功したことを確認

### 8.3 GitHub Actionsワークフローの監視（GitHub MCPを使用）
- プッシュによりワークフローがトリガーされたことを確認
- ワークフローの実行状況をリアルタイムで監視
- 各ジョブ（フロントエンド、バックエンド）の進行状況を確認
- ビルドログにエラーがないか確認

### 8.4 フロントエンドデプロイの確認（Vercel MCP併用）
- GitHub Actionsのフロントエンドデプロイジョブが成功したことを確認
- Vercel MCPでデプロイ状況を確認
- 新しいデプロイが作成されていることを確認
- デプロイURLとバージョンを取得
- PROGRESS.mdにデプロイバージョンと日時を記録

### 8.5 バックエンドデプロイの確認（Render MCP併用）
- GitHub Actionsのバックエンドデプロイジョブが成功したことを確認
- Render MCPでデプロイ状況を確認
- 新しいデプロイが作成されていることを確認
- サービスURLとバージョンを取得
- PROGRESS.mdにデプロイバージョンと日時を記録

### 8.6 本番環境の動作確認
- 本番フロントエンドURLにアクセス
- すべてのセクションが正しく表示されることを確認
- 新しく投入したコンテンツ（Works, Hero/Timeline, Skills, About）が正しく表示されることを確認
- Supabaseからのデータが正しく表示されていることを確認
- バックエンドAPIが正しくデータを返していることを確認

### 8.7 GitHub Actionsまたはデプロイ失敗時の対応
もしワークフローまたはデプロイが失敗した場合：
1. GitHub Actionsのログからエラー原因を特定
2. Vercel/Renderのビルドログも確認
3. コードまたはワークフロー設定を修正
4. CHANGELOG.mdに修正内容を追記
5. PROGRESS.mdのチェックリストを更新
6. 再度コミット・プッシュ
7. ワークフローが成功するまで繰り返す

---

## パート9: 最終確認とドキュメント更新

### 9.1 Supabaseデータ取得の最終確認
- 本番環境ですべてのテーブルからデータが正しく取得できることを確認
- フロントエンドで各セクションにデータが正しく表示されることを確認
- 新しく投入したコンテンツがすべて表示されていることを確認

### 9.2 クリーンアップの最終確認
- 削除したファイル・ディレクトリがリポジトリから削除されていることを確認
- 削除したパッケージがpackage.jsonから削除されていることを確認
- 本番環境で問題なく動作していることを確認

### 9.3 GitHub Actions実行結果の記録
- ワークフローの実行結果をPROGRESS.mdに記録
- コミットハッシュ、実行時間、各ジョブの結果を記載

### 9.4 CHANGELOG.mdの最終更新
- 今回の作業で行ったすべての変更を記録
- 投入したコンテンツを「Added」セクションに記載
- 削除したファイル・パッケージを「Removed」セクションに記載
- バージョン番号を適切に設定
- 日付を記載
- デプロイバージョン（Vercel, Render, Supabase）を記載

### 9.5 PROGRESS.mdの最終更新
- すべてのチェックリスト項目を更新
- 削除したファイル・ディレクトリ一覧を記載
- 削除したパッケージ一覧を記載
- 本番環境URLを記載
- デプロイバージョン履歴を記載
- GitHub Actions実行履歴を記載
- 既知の問題があれば記載
- 作業履歴に今回の作業を追加

### 9.6 最終コミット
- CHANGELOG.mdとPROGRESS.mdの最終更新をコミット
- コミットメッセージにバージョン番号を含める
- プッシュ
- GitHub Actionsワークフローが再度実行されることを確認（必要に応じて）

---

## 完了報告フォーマット

作業完了後、以下の形式で報告してください：

### バージョン情報
- 今回のバージョン: X.X.X
- Vercelデプロイバージョン: X.X.X
- Renderデプロイバージョン: X.X.X
- Supabaseスキーマバージョン: X.X.X

### Supabaseコンテンツ投入結果
| テーブル名 | 投入データ | レコード数 |
|----------|----------|----------|
| works | RAGシステム、スケジュール管理、ポートフォリオ | X件 |
| hero | インテリジェントフォース、EQUES（Timeline） | X件 |
| skills | 言語、フロントエンド、バックエンド等 | X件 |
| about | 研究内容、自己紹介 | X件 |

### Supabaseデータ取得状況
| テーブル名 | 取得状態 | レコード数 | RLSステータス |
|----------|--------|----------|--------------|

### クリーンアーキテクチャ実装状況
| 層 | ファイル数 | 状態 |
|---|----------|-----|
| Router | X | ✓/✗ |
| UseCase | X | ✓/✗ |
| Domain/Entity | X | ✓/✗ |
| Domain/IRepository | X | ✓/✗ |
| Infra/Repository | X | ✓/✗ |

### クリーンアップ結果
| カテゴリ | 削除数 |
|---------|-------|
| ファイル | X件 |
| ディレクトリ | X件 |
| npmパッケージ | X件 |
| 未使用import | X件 |

### 削除した主要項目
- ファイル/ディレクトリ: （主要なものを列挙）
- パッケージ: （削除したパッケージ名を列挙）

### GitHub Actions実行結果
| ワークフロー | トリガー | フロントエンドジョブ | バックエンドジョブ | 全体結果 |
|------------|--------|-------------------|------------------|---------|
| deploy.yml | push to main | ✓/✗ | ✓/✗ | 成功/失敗 |

### デプロイ結果
- フロントエンド本番URL:
- バックエンド本番URL:
- デプロイ時刻:
- コミットハッシュ:

### 各セクション動作確認（本番環境）
| セクション | データ取得 | 表示 |
|-----------|----------|-----|
| Hero | ✓/✗ | ✓/✗ |
| About | ✓/✗ | ✓/✗ |
| Works | ✓/✗ | ✓/✗ |
| Skills | ✓/✗ | ✓/✗ |
| Contact | ✓/✗ | ✓/✗ |

---

それでは、パート1から開始してください。
各パートの完了後、次のパートに自動的に進んでください。
重大なエラーやデータ削除を伴う操作以外は、私への確認なしに自律的に進めてください。
GitHub Actionsワークフローまたはデプロイが失敗した場合は、ログから原因を特定して修正し、成功するまで繰り返してください。
作業の各段階でCHANGELOG.mdとPROGRESS.mdを適宜更新してください。
不要なファイル・コードの削除は慎重に行い、削除前に本当に使用されていないことを確認してください。
Supabaseへのコンテンツ投入は、上記「ポートフォリオに反映すべきコンテンツ」セクションの内容を正確に反映してください。
すべてのデプロイにはバージョン番号を付与し、PROGRESS.mdに記録してください。
```