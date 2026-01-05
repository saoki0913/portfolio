# Claude Code Prompt — UI/UX Pro Max（明示指定）: Portfolio Site Design Improvement + GitHub Push

> **目的**: 既存のポートフォリオサイト（現状のコード/デザイン）を、UI/UXの観点から「一段上の完成度」に引き上げ、**修正完了後に変更内容をまとめて GitHub に push するところまで**一気通貫で実行するための **Claude Code 用プロンプト**です。  
> Claude Code 側で **UI/UX Pro Max Skill を明示的に使用**して進めてください。

---

## 0) 最重要：Skill 使用の明示（これを最初に実行）

**あなたは必ず最初に以下を宣言してから作業を開始してください。**

- 「UI/UX Pro Max Skill を使用して作業します」と明記する  
- 以降、提案・設計・実装・レビューまで **UI/UX Pro Max Skill** の観点（UX、UI、A11y、パフォーマンス、実装可能性）で判断する

---

## 1) ロール定義（必須）

あなたは **UI/UX Pro Max Skill を有効化した**、シニアのプロダクトデザイナー兼フロントエンドアーキテクトです。  
次を同時に満たす改善提案・設計・実装・検証・成果物整理まで落とし込みます。

- 視覚設計: タイポ、余白、階層、配色、コンポーネント整合
- UX設計: 情報設計（IA）、回遊、認知負荷、CTA、説得力、ストーリー
- アクセシビリティ: WCAG/ARIA、コントラスト、フォーカス、キーボード
- 実装容易性: デザインをコードに落とせる具体性（React/Next/Tailwind等）
- パフォーマンス: LCP/CLS、画像最適化、モーション節度、Core Web Vitals

---

## 2) 入力（あなたが最初に把握すること：質問で止めない）

次の情報を **リポジトリ/ファイルから自分で把握し、前提として要約**してください（情報が不足していても、合理的な推定を置き、作業を止めない）。

1. 既存サイトの構成（セクション/ページ、主要コンポーネント）
2. 現在のデザイン特徴（配色、フォント、余白、カード、アイコン、アニメ）
3. 技術スタック（例: Next.js / React / Tailwind / CSS Modules / Framer Motion など）
4. レスポンシブ状況（ブレイクポイント、スマホ崩れ）
5. 課題箇所（導線弱い、読みにくい、情報不足/過多、信頼要素不足）

---

## 3) ゴール定義

### 3.1 成果物（あなたの最終アウトプット）
順番に生成してください。

1. **UI/UX診断レポート**（重大度: High/Med/Low）
2. **改善方針（Design Strategy）**
3. **IA（情報設計）/ セクション再設計案**
4. **デザインシステム（Tokens & Components）**
5. **実装に直結する変更（ファイル単位の差分計画）**
6. **最終チェックリスト（A11y/Perf/一貫性/OGP等）**
7. **変更サマリー（PR用）** + **GitHub Push**（後述）

### 3.2 成功指標（Acceptance Criteria）
- 5秒以内に「何者か」「強み」「提供価値」が理解できる
- Projects が **比較しやすい**（目的・役割・技術・成果・学びが揃う）
- モバイルで読める（行長、余白、タップ領域、ナビ）
- Light/Dark 両方で可読性とブランド感が維持される
- 視覚ノイズが減り、見出し→本文→CTA の階層が明確

---

## 4) デザイン改善の要求（具体指示）

### 4.1 トーン & 印象
- 誠実・知的・プロフェッショナル（硬すぎない）
- 研究/エンジニアリングの信頼感（証拠・数字・再現性）
- 視認性重視（本文可読性、見出しメリハリ）

### 4.2 Hero（最重要）
- 1画面で完結：名前 / 肩書き 
- 背景装飾は節度（ノイズ禁止）。主役はテキスト。

### 4.3 Projects（採用が最も見る）
- ProjectCard を標準化：Problem / Role / Approach / Outcome（数値優先）、Tech、Links
- 研究とプロダクトの分離案も検討
- 作品が多い場合はフィルタ（カテゴリ/年/技術）

### 4.4 ナビゲーション
- 1ページなら固定ヘッダー＋現在地ハイライト
- スマホはタップしやすい導線（ハンバーガー/下部タブ等）
- Contact/Resume は常時露出を検討

### 4.5 タイポ / 余白 / グリッド
- 行長: 45–75文字程度を目安（崩れは調整）
- 余白スケールを定義し、リズム統一
- グリッド整列（12カラム相当）

### 4.6 モーション
- 「意味がある」モーションのみ（導線/階層補助）
- duration/easing統一、過剰パララックス禁止
- prefers-reduced-motion 対応

### 4.7 A11y / 品質
- コントラスト（Light/Dark）
- フォーカスリング可視化、キーボード操作
- alt、見出し構造（h1→h2→h3）
- OGP、favicon、メタ、サイトマップ等

---

## 5) 作業手順（必ずこの順で）

1. **現状解析**: 構造/スタイル/UX課題を列挙（重大度付き）
2. **再設計提案**: 構造→導線→コンポーネント→装飾の順に改善案
3. **Design System 定義**: トークンと主要コンポ仕様を確定
4. **実装**: 変更を最小の破壊で段階的に適用（コンポ単位）
5. **検証**: レスポンシブ、A11y、パフォーマンス（可能ならLighthouse）を確認
6. **仕上げ**: 文言統一、誤字、リンク、OGP、favicon
7. **変更サマリー作成**（PRテンプレート形式）
8. **GitHub へ push**（次章の手順で必ず実行）

---

## 6) GitHub Push までの要件（必須）

### 6.1 ブランチ戦略
- 既存の開発フローがない場合は、次を採用
  - ブランチ名: `feature/ux-polish-portfolio`
- すでにブランチ運用がある場合は、それに従う（ただし push まで行う）

### 6.2 実行してほしい Git 操作（あなたが実際に行う）
以下を **実際にコマンドで実行**し、途中結果（要点）も報告してください。

1. 現在の状態確認
   - `git status`
   - `git branch --show-current`
2. 最新化
   - `git fetch --all --prune`
   - 必要なら `git pull --rebase`（運用に合わせる）
3. ブランチ作成/切替
   - `git checkout -b feature/ux-polish-portfolio`（存在時は `git checkout`）
4. 変更の実装（UI/UX改善）
5. ローカル検証（可能な範囲で）
   - `npm test` / `pnpm test` / `yarn test`（プロジェクトに合わせる）
   - `npm run lint`
   - `npm run build`
6. 変更点の確認と整理
   - `git diff`
7. ステージング
   - `git add -A`
8. コミット（Conventional Commits 推奨）
   - 例: `feat(ui): improve portfolio IA and project cards`
   - 例: `fix(a11y): improve focus states and contrast`
   - コミットは **大きすぎる場合は分割**（UI/UX系・A11y系・メタ/OGP系 など）
9. push
   - `git push -u origin feature/ux-polish-portfolio`

### 6.3 push 前の最低品質ゲート（必須）
- ビルドが通る（`run build` 成功）
- 主要ページのレンダリングが破綻しない
- モバイルで致命的な崩れがない
- A11y：フォーカス可視、見出し階層の破綻なし
- 不要ファイル（例: `.DS_Store`）が含まれていない

---

## 7) 変更サマリー（PR用テンプレ）

push 直前に、以下の形式で **変更内容をまとめて**ください（必須）。

### Summary
- （3〜6行で、何をなぜ改善したか）

### Key Changes
- IA / 導線
- Visual / タイポ / 余白
- Projects 表示
- A11y
- Perf / 画像 / モーション
- メタ/OGP（該当時）

### Screens / Evidence
- Before/After の差分（可能ならスクショパス or 主要ポイント）
- Lighthouse / Core Web Vitals（可能なら）

### How to Test
- 手順（例: `npm i` → `npm run dev` → 確認ページ …）

### Notes / Follow-ups
- 今回含めなかった改善（次のTODO）

---

## 8) Claude Code の最終出力フォーマット（省略不可）

1. Executive Summary（3–6行）
2. Current State Findings（重大度付き）
3. Proposed IA & User Journey
4. Visual System（Tokens）
5. Component Spec（主要コンポーネント）
6. Implementation Plan（優先度付きタスク）
7. QA Checklist（A11y/Perf/Content）
8. PR Summary（テンプレに沿って）
9. Git Log（コミット一覧）+ Push Result（ブランチ名・push完了の報告）

---

## 9) 制約（守ること）

- 既存のコンセプトは尊重しつつ、改善は大胆に
- 見た目だけでなく **採用担当の意思決定を助ける情報設計**を中心に
- 追加ライブラリは最小限（必要なら理由・代替案も併記）
- 文章は日本語、UI文言は必要に応じて日英併記可
- 作業途中で止まらず、**必ず push まで完了**させる

---

## 10) 追加指示（推奨）
- Hero のコピー案を3パターン提示
- Projectの書き方テンプレ（Problem/Role/Approach/Outcome）
- “研究”と“プロダクト”の両立案を比較表で提示

---

以上。まずはリポジトリを解析し、UI/UX Pro Max Skill を明示的に使用して、手順通りに改善→検証→変更サマリー作成→GitHub push まで実行してください。
