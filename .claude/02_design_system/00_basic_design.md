# デザインシステム - 基本設計

## 1. デザインコンセプト

### 1.1 テーマ: "Neo-Japandi Bento"

**"Structured Chaos - 構造化された混沌"**

スカンジナビアデザインの機能性と日本の「わび・さび（不完全の美）」を融合させた「Japandi」スタイルに、現代的なWeb技術とBento UIの合理性を掛け合わせたデザインコンセプト。

### 1.2 コンセプト要素

| 要素 | 従来のアプローチ | Neo-Japandiアプローチ |
|------|--------------|-------------------|
| レイアウト構造 | 線形・縦スクロール (Linear) | モジュール型・非線形 (Modular Bento) |
| 色彩戦略 | 純粋なモノクロ (#000/#FFF) | 知覚的均等色空間 (OKLCH) と自然色 |
| 情報伝達 | 静的な画像とテキスト | スクロール連動型ストーリーテリング (Scrollytelling) |
| タイポグラフィ | システムフォント優先 | 可変フォントと表現的タイポグラフィ |
| インタラクション | クリックのみ | ホバー、視差効果、マイクロインタラクション |

### 1.3 参考サイト

- **Linear** (https://linear.app) - Bento Grid、スムーズなアニメーション
- **Vercel** (https://vercel.com) - Dark Mode First、Glassmorphism
- **Stripe** (https://stripe.com) - クリーンなレイアウト、適切な余白
- **Yoru Design** (https://yoru.design) - 日本的な美意識とモダンUIの融合

---

## 2. 戦略的転換ポイント

### 2.1 「静的」から「動的・文脈的」な体験へ

2025年のトレンドでは「表現の復権」が重要。AIによる生成コンテンツが氾濫する時代において：

- **手触り感（Human Touch）**: 人間が介在した痕跡
- **不完全さ（Anti-Design）**: 意図的な不完全性
- **感情的なつながり**: ユーザーとの共感

### 2.2 「間（Ma）」の設計

日本のWebデザインにおいて、余白は単なる空白ではなく「間」として機能：

- **ギャップ**: 24px〜32px（従来の16px〜20pxより大きめ）
- **内側パディング**: 十分な呼吸空間
- **モジュール独立性**: 各セルの視覚的分離

---

## 3. クイックスタート

### 3.1 カラーパレット（OKLCH）

```css
/* ダークモード（Deep Focus）- 推奨 */
--bg-surface: oklch(18% 0.03 260);        /* #151921 深い藍色のスレート */
--bg-card: oklch(24% 0.03 260);           /* #222733 カード背景 */
--text-primary: oklch(95% 0.01 90);       /* ハレーション対策済み白 */
--text-subtle: oklch(70% 0.02 260);       /* サブテキスト */

/* ライトモード（Japandi Light）*/
--bg-surface-light: oklch(97% 0.01 90);   /* #F7F6F3 生成色 */
--text-primary-light: oklch(30% 0.02 280);/* #38383D 墨色 */

/* アクセントカラー */
--accent-primary: oklch(65% 0.20 250);    /* 青系 */
--accent-secondary: oklch(65% 0.20 300);  /* 紫系 */
--accent-nature: oklch(65% 0.13 140);     /* #72A676 抹茶グリーン */

/* セマンティック */
--success: oklch(70% 0.18 150);           /* 成功 */
--error: oklch(65% 0.25 25);              /* エラー */
--warning: oklch(75% 0.18 85);            /* 警告 */
```

### 3.2 タイポグラフィ

```css
/* フォントスタック - 和欧混植最適化 */
font-family:
  "Manrope",                    /* 欧文優先 */
  "Zen Kaku Gothic New",        /* 和文Webフォント */
  "Hiragino Kaku Gothic ProN",  /* Mac用フォールバック */
  "Meiryo",                     /* Windows用フォールバック */
  sans-serif;

/* 文字組み設定 */
font-feature-settings: "palt";  /* プロポーショナルメトリクス */

/* 行間（日本語最適化）*/
--line-height-heading: 1.4;     /* 見出し */
--line-height-body: 1.8;        /* 本文 */
```

### 3.3 スペーシング（2025年推奨）

```css
/* より大きめのスペーシング */
--spacing-xs: 8px;    /* 0.5rem */
--spacing-sm: 16px;   /* 1rem */
--spacing-md: 24px;   /* 1.5rem - 標準ギャップ */
--spacing-lg: 32px;   /* 2rem */
--spacing-xl: 48px;   /* 3rem */
--spacing-2xl: 64px;  /* 4rem */
--spacing-3xl: 96px;  /* 6rem - セクション間 */
```

---

## 4. デザインパターン

### 4.1 Bento Grid（弁当箱グリッド）

情報を「消化可能な一口サイズ」に分割し、認知負荷を軽減：

```tsx
// 4カラムBento Grid（デスクトップ）
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="lg:col-span-2 lg:row-span-2">Hero Card</div>
  <div>Small Card</div>
  <div>Small Card</div>
  <div>Small Card</div>
  <div className="lg:col-span-2">Wide Card</div>
</div>
```

### 4.2 Glassmorphism（ガラス質UI）

```tsx
<div className="
  bg-white/5
  backdrop-blur-xl
  border border-white/10
  rounded-2xl
  shadow-lg shadow-black/5
">
  Content
</div>
```

### 4.3 ノイズテクスチャ（質感の追加）

```css
/* 紙のような質感を追加 */
.texture-overlay {
  position: fixed;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,...");
  mix-blend-mode: overlay;
}
```

### 4.4 Micro-interactions

- **ホバー時のリフト**: `hover:translate-y-[-4px]`
- **マグネティックボタン**: カーソル追従効果
- **カスタムカーソル**: `mix-blend-mode: difference`
- **スムーズトランジション**: `transition-all duration-300 ease-out`

---

## 5. アクセシビリティ要件

### 5.1 コントラスト基準

- **WCAG 2.1 AA**: テキストコントラスト 4.5:1以上
- **ダークモードハレーション対策**: 純白を避け、`rgba(255,255,255, 0.87)`使用

### 5.2 Reduced Motion対応

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 5.3 キーボードナビゲーション

- すべてのインタラクティブ要素がTab操作可能
- `:focus-visible`で明確なフォーカスリング

---

## 6. パフォーマンス指針

### 6.1 画像最適化

- **フォーマット**: AVIF > WebP > JPEG
- **遅延読み込み**: `loading="lazy"`（ファーストビュー以外）
- **Next.js Image**: `next/image`コンポーネント使用必須

### 6.2 フォント最適化

- **font-display**: `swap`でレンダリングブロック防止
- **サブセット化**: 頻出漢字のみ含むサブセット

### 6.3 アニメーション最適化

- **GPU加速**: `transform`/`opacity`優先
- **will-change**: 必要時のみ適用
- **IntersectionObserver**: 画面外要素の停止

---

## 7. ドキュメント参照

| ドキュメント | 内容 |
|------------|------|
| `01_design_principles.md` | カラー・タイポグラフィ詳細 |
| `02_component_design.md` | コンポーネント設計 |
| `03_animation_system.md` | アニメーションシステム |
| `04_layout_system.md` | レイアウト・グリッド設計 |

---

## 8. まとめ

Neo-Japandi Bentoデザインシステムの核心：

1. **Bento Grid** - モジュール型・非線形レイアウト
2. **OKLCH色空間** - 知覚的均等な色彩設計
3. **和欧混植タイポグラフィ** - 美しい文字組み
4. **Scrollytelling** - スクロール連動ストーリーテリング
5. **Micro-interactions** - 細部の遊び心
6. **アクセシビリティ** - 全ユーザーへの配慮
7. **パフォーマンス** - Core Web Vitals最適化
