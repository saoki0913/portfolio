# デザイン原則

## 1. カラーパレット（OKLCH色空間）

### 1.1 なぜOKLCH?

従来のRGB/HEXは人間の知覚と一致しない問題がある。OKLCH（Lightness, Chroma, Hue）は知覚的均等色空間であり、以下の利点がある：

- 明度を変更しても色相が変化しない
- アクセシビリティ対応が容易
- ダークモード用パレットの自動生成が可能

### 1.2 ダークモード "Deep Focus" パレット（推奨）

| 用途 | OKLCH | HEX | 説明 |
|------|-------|-----|------|
| 背景 | oklch(18% 0.03 260) | #151921 | 深い藍色のスレート |
| カード背景 | oklch(24% 0.03 260) | #222733 | ボーダーレスでも認識可能 |
| テキスト(主) | oklch(95% 0.01 90) | #F0EDE8 | ハレーション対策済み |
| テキスト(副) | oklch(70% 0.02 260) | #9CA3AF | サブテキスト |
| テキスト(淡) | oklch(50% 0.02 260) | #6B7280 | 補助テキスト |
| ボーダー | oklch(30% 0.02 260) | #374151 | 微細な境界線 |

### 1.3 ライトモード "Japandi Light" パレット

| 用途 | OKLCH | HEX | 説明 |
|------|-------|-----|------|
| 背景 | oklch(97% 0.01 90) | #F7F6F3 | 生成色（きなりいろ） |
| カード背景 | oklch(100% 0 0) | #FFFFFF | 純白カード |
| テキスト(主) | oklch(30% 0.02 280) | #38383D | 墨色 |
| テキスト(副) | oklch(50% 0.02 280) | #6B6B6F | サブテキスト |
| ボーダー | oklch(85% 0.01 90) | #E5E5E0 | 柔らかい境界線 |

### 1.4 アクセントカラー

| 用途 | OKLCH | HEX | Tailwind |
|------|-------|-----|----------|
| Primary | oklch(65% 0.20 250) | #3B82F6 | `bg-blue-500` |
| Secondary | oklch(65% 0.20 300) | #A855F7 | `bg-purple-500` |
| Nature | oklch(65% 0.13 140) | #72A676 | 抹茶グリーン |
| Gradient | - | Blue → Purple | `bg-gradient-to-r from-blue-500 to-purple-500` |

### 1.5 セマンティックカラー

| 用途 | OKLCH | HEX | Tailwind |
|------|-------|-----|----------|
| Success | oklch(70% 0.18 150) | #10B981 | `bg-emerald-500` |
| Error | oklch(65% 0.25 25) | #EF4444 | `bg-red-500` |
| Warning | oklch(75% 0.18 85) | #F59E0B | `bg-amber-500` |
| Info | oklch(70% 0.15 240) | #0EA5E9 | `bg-sky-500` |

---

## 2. タイポグラフィ

### 2.1 フォントスタック（和欧混植最適化）

```css
/* 推奨フォントスタック */
font-family:
  "Manrope",                    /* 欧文: 幾何学的サンセリフ */
  "Zen Kaku Gothic New",        /* 和文: モダンゴシック */
  "Hiragino Kaku Gothic ProN",  /* Mac fallback */
  "Meiryo",                     /* Windows fallback */
  sans-serif;

/* コード用 */
font-family:
  "JetBrains Mono",
  "Fira Code",
  "Consolas",
  monospace;
```

### 2.2 フォント選定理由

- **Manrope**: 幾何学的でモダン、Bento Gridの直線的レイアウトと相性良好
- **Zen Kaku Gothic New**: ふところが広くモダンな印象、Google Fonts対応
- **可変フォント対応**: font-weightのアニメーションが滑らか

### 2.3 フォントサイズスケール

| 用途 | サイズ | Line-Height | Tailwind |
|------|--------|-------------|----------|
| Display | 4.5rem (72px) | 1.1 | `text-7xl` |
| Hero | 3.75rem (60px) | 1.2 | `text-6xl` |
| H1 | 3rem (48px) | 1.3 | `text-5xl` |
| H2 | 2.25rem (36px) | 1.35 | `text-4xl` |
| H3 | 1.875rem (30px) | 1.4 | `text-3xl` |
| H4 | 1.5rem (24px) | 1.4 | `text-2xl` |
| Body Large | 1.125rem (18px) | 1.75 | `text-lg` |
| Body | 1rem (16px) | 1.8 | `text-base` |
| Small | 0.875rem (14px) | 1.7 | `text-sm` |
| XSmall | 0.75rem (12px) | 1.6 | `text-xs` |

### 2.4 フォントウェイト

| 用途 | ウェイト | Tailwind |
|------|---------|----------|
| 見出し | Bold (700) | `font-bold` |
| 強調 | Semibold (600) | `font-semibold` |
| 中間 | Medium (500) | `font-medium` |
| 本文 | Normal (400) | `font-normal` |
| 軽め | Light (300) | `font-light` |

### 2.5 文字組み（マイクロタイポグラフィ）

```css
/* プロポーショナルメトリクス - 日本語の文字詰め */
.text-japanese {
  font-feature-settings: "palt";
}

/* 行間設定 */
.heading { line-height: 1.4; }
.body { line-height: 1.8; }

/* トラッキング */
.tight { letter-spacing: -0.025em; }  /* 見出し */
.wide { letter-spacing: 0.05em; }     /* キャプション */
.extra-wide { letter-spacing: 0.2em; } /* サブタイトル */
```

### 2.6 縦書き（アクセント用）

```css
/* セクションタイトルの縦書き配置 */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
```

---

## 3. スペーシング

### 3.1 スペーシングスケール（2025年推奨）

より大きめのギャップで「間（Ma）」を表現：

| トークン | 値 | Tailwind | 用途 |
|----------|-----|----------|------|
| `--space-1` | 4px | `p-1` | アイコン内 |
| `--space-2` | 8px | `p-2` | コンパクトな間隔 |
| `--space-3` | 12px | `p-3` | 小さなカード内 |
| `--space-4` | 16px | `p-4` | 標準パディング |
| `--space-6` | 24px | `p-6` | カード内パディング |
| `--space-8` | 32px | `p-8` | セクション内 |
| `--space-12` | 48px | `p-12` | セクション間 |
| `--space-16` | 64px | `p-16` | 大きなセクション |
| `--space-24` | 96px | `p-24` | ページセクション |
| `--space-32` | 128px | `p-32` | ヒーロー領域 |

### 3.2 グリッドギャップ推奨値

| デバイス | ギャップ | Tailwind |
|---------|---------|----------|
| Mobile | 16px | `gap-4` |
| Tablet | 24px | `gap-6` |
| Desktop | 24px〜32px | `gap-6` `gap-8` |

### 3.3 コンテナ幅

| サイズ | 最大幅 | Tailwind | 用途 |
|--------|--------|----------|------|
| Narrow | 640px | `max-w-xl` | 記事本文 |
| Medium | 1024px | `max-w-5xl` | 標準コンテンツ |
| Wide | 1280px | `max-w-7xl` | Bento Grid |
| Full | 100% | `max-w-full` | 全幅セクション |

---

## 4. ブレークポイント

### 4.1 レスポンシブ定義

| デバイス | 幅 | Tailwind | Bento動作 |
|---------|-----|----------|-----------|
| Mobile | < 768px | (default) | 1カラム |
| Tablet | ≥ 768px | `md:` | 2カラム |
| Desktop | ≥ 1024px | `lg:` | 4カラム |
| Wide | ≥ 1280px | `xl:` | 4カラム（余白増） |
| Ultra | ≥ 1536px | `2xl:` | 完全なBento |

### 4.2 Bentoリフローロジック

```tsx
// モバイル: 重要なセルを最上部に
// Tablet: 2x2セルは全幅に
// Desktop: 完全なgrid-template-areas
```

---

## 5. シャドウとエレベーション

### 5.1 シャドウスケール

| レベル | CSS | 用途 |
|--------|-----|------|
| Subtle | `shadow-sm shadow-black/5` | ホバー前 |
| Default | `shadow-md shadow-black/10` | カード |
| Raised | `shadow-lg shadow-black/15` | モーダル |
| Floating | `shadow-xl shadow-black/20` | ドロップダウン |
| Overlay | `shadow-2xl shadow-black/25` | ダイアログ |

### 5.2 グロウエフェクト

```css
/* アクセントグロウ */
.glow-primary {
  box-shadow: 0 0 40px 0 rgba(59, 130, 246, 0.3);
}

.glow-secondary {
  box-shadow: 0 0 40px 0 rgba(168, 85, 247, 0.3);
}
```

---

## 6. ボーダー

### 6.1 ボーダー幅

| 幅 | Tailwind | 用途 |
|----|----------|------|
| 1px | `border` | 標準 |
| 2px | `border-2` | 強調 |

### 6.2 ボーダー半径

| サイズ | 値 | Tailwind | 用途 |
|--------|-----|----------|------|
| Small | 4px | `rounded` | バッジ |
| Medium | 8px | `rounded-lg` | ボタン |
| Large | 12px | `rounded-xl` | 入力フィールド |
| XL | 16px | `rounded-2xl` | カード（推奨） |
| Full | 9999px | `rounded-full` | アバター |

### 6.3 Glassmorphismボーダー

```css
.glass-border {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.2);
}
```

---

## 7. アクセシビリティ

### 7.1 コントラスト基準

| 要素 | 最低コントラスト比 | 基準 |
|------|----------------|------|
| 本文テキスト | 4.5:1 | WCAG AA |
| 大テキスト (18px+) | 3:1 | WCAG AA |
| UIコンポーネント | 3:1 | WCAG AA |
| 理想値 | 7:1 | WCAG AAA |

### 7.2 ダークモードの注意点

```css
/* ハレーション対策 - 純白を避ける */
--text-on-dark: rgba(255, 255, 255, 0.87);
--text-subtle-on-dark: rgba(255, 255, 255, 0.6);
--text-muted-on-dark: rgba(255, 255, 255, 0.38);
```

### 7.3 フォーカス状態

```css
/* 明確なフォーカスリング */
.focus-ring:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

---

## 8. まとめ

デザイン原則の核心：

1. **OKLCH色空間** - 知覚的均等な色彩管理
2. **和欧混植** - Manrope + Zen Kaku Gothicの最適組み合わせ
3. **大きめスペーシング** - 「間」を活かした余白設計
4. **モバイルファースト** - Bento Gridの賢いリフロー
5. **アクセシビリティ** - WCAG AA準拠、ハレーション対策
