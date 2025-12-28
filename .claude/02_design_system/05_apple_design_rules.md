# 🎨 Portfolio Design System v2.0
**Apple HIG準拠 × Modern Tech Aesthetic**

作成日: 2025-12-28
バージョン: 2.0.0
対象: ポートフォリオサイト（テック企業採用担当者向け）

---

## 📚 目次

1. [デザイン原則](#1️⃣-デザイン原則)
2. [カラーシステム](#2️⃣-カラーシステム)
3. [タイポグラフィ](#3️⃣-タイポグラフィ)
4. [スペーシングシステム](#4️⃣-スペーシングシステム)
5. [角丸（Border Radius）](#5️⃣-角丸border-radius)
6. [影とエレベーション](#6️⃣-影とエレベーション)
7. [コンポーネント設計](#7️⃣-コンポーネント設計)
8. [アクセシビリティ](#8️⃣-アクセシビリティ)
9. [実装ガイド](#9️⃣-実装ガイド)

---

## 1️⃣ デザイン原則

### Apple HIG × Tech Portfolio

| 原則 | 実装方針 |
|------|----------|
| **Clarity（明確性）** | タイポグラフィの階層、コントラスト比4.5:1以上 |
| **Deference（敬意）** | コンテンツ優先、装飾は控えめ |
| **Depth（深度）** | レイヤー構造、適切な影とグラデーション |
| **Consistency（一貫性）** | 統一されたコンポーネント、予測可能な動作 |
| **Feedback（フィードバック）** | ホバー、フォーカス、ローディング状態の明示 |

---

## 2️⃣ カラーシステム

### 🎨 セマンティックカラー定義

```typescript
// tailwind.config.ts 推奨設定
export default {
  theme: {
    extend: {
      colors: {
        // ブランドカラー（プライマリ）
        brand: {
          50: 'oklch(97% 0.05 250)',   // 極薄い青
          100: 'oklch(93% 0.08 250)',  // 薄い青
          200: 'oklch(85% 0.12 250)',  // 明るい青
          300: 'oklch(75% 0.16 250)',  // ライト青
          400: 'oklch(70% 0.18 250)',  // ミディアム青
          500: 'oklch(65% 0.20 250)',  // メイン青（プライマリ）
          600: 'oklch(55% 0.20 250)',  // ダーク青
          700: 'oklch(45% 0.18 250)',  // 濃い青
          800: 'oklch(35% 0.15 250)',  // とても濃い青
          900: 'oklch(25% 0.12 250)',  // 極濃い青
        },

        // アクセントカラー（セカンダリ）
        accent: {
          50: 'oklch(97% 0.05 300)',
          100: 'oklch(93% 0.08 300)',
          200: 'oklch(85% 0.12 300)',
          300: 'oklch(75% 0.16 300)',
          400: 'oklch(70% 0.18 300)',
          500: 'oklch(65% 0.20 300)',  // メイン紫（セカンダリ）
          600: 'oklch(55% 0.20 300)',
          700: 'oklch(45% 0.18 300)',
          800: 'oklch(35% 0.15 300)',
          900: 'oklch(25% 0.12 300)',
        },

        // ニュートラル（グレースケール）
        neutral: {
          50: 'oklch(98% 0.005 280)',   // ほぼ白
          100: 'oklch(96% 0.005 280)',  // 極薄いグレー
          200: 'oklch(92% 0.008 280)',  // 薄いグレー
          300: 'oklch(85% 0.01 280)',   // ライトグレー
          400: 'oklch(70% 0.015 280)',  // ミディアムグレー
          500: 'oklch(55% 0.02 280)',   // グレー
          600: 'oklch(45% 0.02 280)',   // ダークグレー
          700: 'oklch(35% 0.025 280)',  // 濃いグレー
          800: 'oklch(25% 0.03 280)',   // とても濃いグレー
          900: 'oklch(18% 0.03 280)',   // 極濃いグレー（背景）
        },

        // セマンティックカラー
        success: {
          light: 'oklch(85% 0.15 150)',
          DEFAULT: 'oklch(70% 0.18 150)',
          dark: 'oklch(55% 0.18 150)',
        },
        error: {
          light: 'oklch(85% 0.20 25)',
          DEFAULT: 'oklch(65% 0.25 25)',
          dark: 'oklch(50% 0.25 25)',
        },
        warning: {
          light: 'oklch(90% 0.15 85)',
          DEFAULT: 'oklch(75% 0.18 85)',
          dark: 'oklch(60% 0.18 85)',
        },
        info: {
          light: 'oklch(85% 0.12 240)',
          DEFAULT: 'oklch(70% 0.15 240)',
          dark: 'oklch(55% 0.15 240)',
        },
      },
    },
  },
}
```

### 📋 カラー使用ガイドライン

#### **Light Mode（推奨）**

| 用途 | Tailwind Class | カラー値 |
|------|----------------|----------|
| 背景（メイン） | `bg-white` | #FFFFFF |
| 背景（サブ） | `bg-neutral-50` | oklch(98% 0.005 280) |
| カード背景 | `bg-white` + `shadow-md` | #FFFFFF + 影 |
| テキスト（メイン） | `text-neutral-900` | oklch(18% 0.03 280) |
| テキスト（サブ） | `text-neutral-600` | oklch(45% 0.02 280) |
| ボーダー | `border-neutral-200` | oklch(92% 0.008 280) |
| CTA（プライマリ） | `bg-brand-500` + `text-white` | oklch(65% 0.20 250) |
| CTA（セカンダリ） | `bg-accent-500` + `text-white` | oklch(65% 0.20 300) |
| リンク | `text-brand-600 hover:text-brand-700` | oklch(55% 0.20 250) |

---

## 3️⃣ タイポグラフィ

### 📝 フォントスタック（Apple HIG準拠）

```typescript
fontFamily: {
  sans: [
    'SF Pro Display',           // Apple公式（Macのみ）
    '-apple-system',            // システムフォント
    'BlinkMacSystemFont',       // Chrome on Mac
    'Segoe UI',                 // Windows
    'Roboto',                   // Android
    'Helvetica Neue',           // 汎用
    'Arial',                    // フォールバック
    'sans-serif',
  ],
  mono: [
    'SF Mono',                  // Apple公式
    'Monaco',                   // Mac
    'Cascadia Code',            // Windows
    'Consolas',                 // Windows
    'monospace',
  ],
}
```

### 📐 タイポグラフィスケール（8ptベース）

```typescript
fontSize: {
  // Display（Hero見出し）
  'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],  // 72px
  'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }], // 60px
  'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],    // 48px

  // Heading（セクション見出し）
  'h1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],         // 36px
  'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],       // 30px
  'h3': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],                // 24px
  'h4': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '600' }],               // 20px

  // Body（本文）
  'body-xl': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],        // 18px
  'body-lg': ['1rem', { lineHeight: '1.75', letterSpacing: '0', fontWeight: '400' }],            // 16px
  'body-md': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],         // 14px
  'body-sm': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],     // 12px

  // Label（キャプション、ラベル）
  'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],   // 14px
  'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],    // 12px
  'label-sm': ['0.625rem', { lineHeight: '1.3', letterSpacing: '0.03em', fontWeight: '600' }],   // 10px
}
```

---

## 4️⃣ スペーシングシステム

### 📏 Apple HIG準拠 8pt Grid System

```typescript
spacing: {
  '0': '0',           // 0px
  '0.5': '0.125rem',  // 2px
  '1': '0.25rem',     // 4px
  '2': '0.5rem',      // 8px  ← 基本単位
  '3': '0.75rem',     // 12px
  '4': '1rem',        // 16px ← 推奨最小タップ領域
  '6': '1.5rem',      // 24px
  '8': '2rem',        // 32px
  '12': '3rem',       // 48px
  '16': '4rem',       // 64px
  '24': '6rem',       // 96px
}
```

### 📐 コンポーネント別スペーシング

| 用途 | Class | 値 |
|------|-------|-----|
| セクション間隔 | `py-16 md:py-24 lg:py-32` | 64px / 96px / 128px |
| コンテナパディング | `px-4 md:px-6 lg:px-8` | 16px / 24px / 32px |
| カード内パディング | `p-6 md:p-8` | 24px / 32px |
| 要素間隔（小） | `space-y-4` | 16px |
| 要素間隔（中） | `space-y-6` または `space-y-8` | 24px / 32px |
| 要素間隔（大） | `space-y-12` または `space-y-16` | 48px / 64px |

---

## 5️⃣ 角丸（Border Radius）

### 🔲 Apple HIG推奨値

```typescript
borderRadius: {
  'none': '0',
  'sm': '0.25rem',    // 4px  - 小さなボタン、バッジ
  'DEFAULT': '0.5rem', // 8px  - 標準的なボタン
  'md': '0.75rem',    // 12px - カード（小）
  'lg': '1rem',       // 16px - カード（中）
  'xl': '1.5rem',     // 24px - カード（大）
  '2xl': '2rem',      // 32px - モーダル、ヒーローカード
  '3xl': '3rem',      // 48px - 特大要素
  'full': '9999px',   // 完全な円形
}
```

---

## 6️⃣ 影とエレベーション

### 🌓 Apple風シャドウシステム

```typescript
boxShadow: {
  'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'sm': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
  'md': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
  'lg': '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
  'xl': '0 16px 48px 0 rgba(0, 0, 0, 0.15)',
  '2xl': '0 24px 64px 0 rgba(0, 0, 0, 0.18)',
  'brand': '0 8px 32px 0 rgba(59, 130, 246, 0.2)',
  'brand-lg': '0 16px 48px 0 rgba(59, 130, 246, 0.25)',
}
```

---

## 7️⃣ コンポーネント設計

### プライマリボタン
```tsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3 md:px-8 md:py-4
  bg-brand-500 hover:bg-brand-600 active:bg-brand-700
  text-white font-semibold text-body-lg
  rounded-lg shadow-sm hover:shadow-md
  transition-all duration-200
  focus:outline-none focus:ring-4 focus:ring-brand-200
">
  Get Started
</button>
```

### カード
```tsx
<div className="
  bg-white rounded-2xl p-6 md:p-8
  shadow-sm hover:shadow-lg
  border border-neutral-100
  transition-all duration-300
  hover:-translate-y-1
">
  {/* コンテンツ */}
</div>
```

---

## 8️⃣ アクセシビリティ

### WCAG 2.1 AA準拠

| 項目 | 基準 | 実装 |
|------|------|------|
| カラーコントラスト | 4.5:1以上 | `text-neutral-900` on `bg-white` |
| フォーカス状態 | 明示的表示 | `focus:ring-4 focus:ring-brand-200` |
| タップ領域 | 44×44px以上 | `min-h-[44px] min-w-[44px]` |

---

## 9️⃣ 実装ガイド

### 推奨技術スタック

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- Radix UI
- Storybook v8
- axe DevTools

### 品質基準

| カテゴリ | 基準 |
|---------|------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| WCAG準拠 | AA以上 |

---

## 📝 更新履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|---------|
| 2.0.0 | 2025-12-28 | Apple HIG準拠デザインシステム策定 |
