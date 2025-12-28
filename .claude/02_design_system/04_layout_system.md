# レイアウトシステム

## 1. Bento Grid（弁当箱グリッド）

### 1.1 コンセプト

Bento Gridは、情報を「消化可能な一口サイズ」に分割し、認知負荷を軽減するレイアウトパターン。日本の弁当箱からインスピレーションを得た、2024-2025年のWebデザイントレンド。

**特徴:**
- モジュール型・非線形配置
- 視覚的な階層構造
- レスポンシブリフロー
- ホワイトスペースの活用

### 1.2 基本グリッド構造

```tsx
// 4カラムBento Grid（デスクトップ）
<div className="
  grid
  grid-cols-1 md:grid-cols-2 lg:grid-cols-4
  gap-4 md:gap-6 lg:gap-8
">
  {/* Hero Card: 2x2 */}
  <div className="lg:col-span-2 lg:row-span-2">
    Hero Content
  </div>

  {/* Standard Cards: 1x1 */}
  <div>Card 1</div>
  <div>Card 2</div>

  {/* Wide Card: 2x1 */}
  <div className="md:col-span-2">
    Wide Content
  </div>

  {/* Tall Card: 1x2 */}
  <div className="lg:row-span-2">
    Tall Content
  </div>
</div>
```

### 1.3 セルサイズ定義

| サイズ | グリッドスパン | 用途 |
|--------|--------------|------|
| **Small** | 1×1 | スキルバッジ、統計数値 |
| **Medium** | 1×2 | タイムライン項目 |
| **Large** | 2×1 | プロジェクトカード |
| **Hero** | 2×2 | メイン紹介、フィーチャー |
| **Full** | 4×1 | フルワイドセクション |

### 1.4 CSS Grid Template Areas

```tsx
// 名前付きエリアを使用したより複雑なレイアウト
<div className="
  grid
  grid-cols-4
  grid-rows-[auto_auto_auto]
  gap-6
  [grid-template-areas:
    'hero_hero_stats_stats'
    'hero_hero_skill_skill'
    'proj_proj_proj_contact'
  ]
">
  <div className="[grid-area:hero]">Hero</div>
  <div className="[grid-area:stats]">Stats</div>
  <div className="[grid-area:skill]">Skills</div>
  <div className="[grid-area:proj]">Projects</div>
  <div className="[grid-area:contact]">Contact</div>
</div>
```

---

## 2. レスポンシブリフロー

### 2.1 ブレークポイント定義

| デバイス | 幅 | Tailwind | Bento動作 |
|---------|-----|----------|-----------|
| Mobile | < 768px | (default) | 1カラム・スタック |
| Tablet | ≥ 768px | `md:` | 2カラム |
| Desktop | ≥ 1024px | `lg:` | 4カラム |
| Wide | ≥ 1280px | `xl:` | 4カラム（余白増） |
| Ultra | ≥ 1536px | `2xl:` | 完全なBento |

### 2.2 モバイルファースト設計

```tsx
// モバイル: 1カラム → タブレット: 2カラム → デスクトップ: 4カラム
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {/* 重要なセルはモバイルで最上部に配置 */}
  <div className="order-1 md:order-none lg:col-span-2 lg:row-span-2">
    Primary Content
  </div>

  {/* セカンダリコンテンツ */}
  <div className="order-3 md:order-none">
    Secondary 1
  </div>
  <div className="order-4 md:order-none">
    Secondary 2
  </div>

  {/* CTAは常に見える位置に */}
  <div className="order-2 md:order-none md:col-span-2">
    Call to Action
  </div>
</div>
```

### 2.3 リフローロジック

```tsx
// リフロー戦略
const BentoGrid = ({ items }: { items: BentoItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        // モバイルではすべて1カラム
        // タブレットでは2×2セルが全幅に
        // デスクトップでは完全なgrid-template-areas
        const spanClasses = {
          small: '',
          medium: 'lg:row-span-2',
          large: 'md:col-span-2',
          hero: 'md:col-span-2 lg:row-span-2',
          full: 'col-span-full',
        };

        return (
          <div
            key={item.id}
            className={cn(
              'glass-panel rounded-2xl p-6',
              spanClasses[item.size]
            )}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
```

---

## 3. コンテナシステム

### 3.1 コンテナ幅

| サイズ | 最大幅 | Tailwind | 用途 |
|--------|--------|----------|------|
| Narrow | 640px | `max-w-xl` | 記事本文、フォーム |
| Medium | 1024px | `max-w-5xl` | 標準コンテンツ |
| Wide | 1280px | `max-w-7xl` | Bento Grid |
| Full | 100% | `max-w-full` | 全幅セクション |

### 3.2 コンテナコンポーネント

```tsx
interface ContainerProps {
  size?: 'narrow' | 'medium' | 'wide' | 'full';
  children: React.ReactNode;
  className?: string;
}

const containerSizes = {
  narrow: 'max-w-xl',
  medium: 'max-w-5xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = ({
  size = 'wide',
  children,
  className
}: ContainerProps) => (
  <div className={cn(
    'mx-auto px-4 md:px-6 lg:px-8',
    containerSizes[size],
    className
  )}>
    {children}
  </div>
);
```

### 3.3 パディング設計

```tsx
// レスポンシブパディング
<div className="px-4 md:px-6 lg:px-8 xl:px-12">
  Content with responsive padding
</div>

// セクションパディング
<section className="py-16 md:py-24 lg:py-32">
  Section with vertical spacing
</section>
```

---

## 4. セクション構造

### 4.1 標準セクション

```tsx
interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({
  id,
  title,
  subtitle,
  children,
  className
}: SectionProps) => (
  <section
    id={id}
    className={cn('py-24 md:py-32 relative overflow-hidden', className)}
  >
    <Container>
      {/* セクションヘッダー */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {subtitle && (
            <p className="section-subtitle">{subtitle}</p>
          )}
          {title && (
            <h2 className="section-title">{title}</h2>
          )}
        </motion.div>
      )}

      {/* コンテンツ */}
      {children}
    </Container>
  </section>
);
```

### 4.2 フルブリードセクション

```tsx
// 全幅背景 + 制限付きコンテンツ
<section className="relative py-32">
  {/* 全幅背景 */}
  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

  {/* 制限付きコンテンツ */}
  <Container className="relative z-10">
    <h2>Full Bleed Section</h2>
  </Container>
</section>
```

### 4.3 スプリットセクション

```tsx
// 2カラム分割レイアウト
<section className="py-32">
  <Container>
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* 左: テキスト */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">Title</h2>
        <p className="text-subtle text-lg leading-relaxed">
          Description text...
        </p>
      </div>

      {/* 右: ビジュアル */}
      <div className="relative aspect-square">
        <Image
          src="/visual.jpg"
          alt="Visual"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  </Container>
</section>
```

---

## 5. スペーシングシステム

### 5.1 スペーシングスケール

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

### 5.2 「間（Ma）」の設計

```css
/* 日本的な「間」を意識したスペーシング */
/* 従来より大きめのギャップで呼吸空間を確保 */

.section-gap {
  gap: 24px;  /* モバイル */
}

@media (min-width: 768px) {
  .section-gap {
    gap: 32px;  /* タブレット以上 */
  }
}

/* カード内の余白も十分に */
.card-padding {
  padding: 24px;
}

@media (min-width: 768px) {
  .card-padding {
    padding: 32px;
  }
}
```

### 5.3 グリッドギャップ

| デバイス | ギャップ | Tailwind |
|---------|---------|----------|
| Mobile | 16px | `gap-4` |
| Tablet | 24px | `gap-6` |
| Desktop | 24px〜32px | `gap-6` または `gap-8` |

---

## 6. ヒーローセクション

### 6.1 フルスクリーンヒーロー

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* 背景エフェクト */}
  <div className="absolute inset-0 pointer-events-none">
    {/* グラデーションオーブ */}
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
  </div>

  {/* コンテンツ */}
  <Container className="relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto text-center"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
        <span className="text-foreground">Hi, I'm</span>
        <span className="block text-gradient mt-2">Shunsuke Aoki</span>
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-subtle max-w-2xl mx-auto">
        AI Researcher & Full-Stack Developer
      </p>
    </motion.div>
  </Container>

  {/* 下部グラデーションライン */}
  <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
</section>
```

---

## 7. Flexboxパターン

### 7.1 センタリング

```tsx
// 完全中央配置
<div className="flex items-center justify-center min-h-screen">
  Centered Content
</div>

// 垂直中央 + 左寄せ
<div className="flex items-center justify-start gap-4">
  <Icon />
  <span>Label</span>
</div>
```

### 7.2 スペースビトウィーン

```tsx
// ヘッダーレイアウト
<header className="flex items-center justify-between h-16">
  <Logo />
  <Navigation />
  <Actions />
</header>
```

### 7.3 Flex Wrap

```tsx
// タグクラウド
<div className="flex flex-wrap gap-3 justify-center">
  {tags.map((tag) => (
    <span
      key={tag}
      className="px-4 py-2 text-sm bg-card border border-border rounded-full"
    >
      {tag}
    </span>
  ))}
</div>
```

---

## 8. Z-Index階層

### 8.1 Z-Index スケール

| レベル | 値 | 用途 |
|--------|-----|------|
| Base | 0 | デフォルトコンテンツ |
| Raised | 10 | ホバーカード |
| Dropdown | 20 | ドロップダウンメニュー |
| Sticky | 30 | スティッキーヘッダー |
| Overlay | 40 | オーバーレイ背景 |
| Modal | 50 | モーダルダイアログ |
| Toast | 60 | 通知トースト |

### 8.2 実装例

```tsx
// Tailwind CSS での定義
<header className="fixed top-0 z-30 ...">Header</header>
<div className="fixed inset-0 z-40 bg-black/50">Overlay</div>
<div className="fixed z-50 ...">Modal</div>
```

---

## 9. スクロールスナップ

### 9.1 フルページスナップ

```tsx
// フルページスクロールスナップ
<div className="h-screen overflow-y-scroll snap-y snap-mandatory">
  <section className="h-screen snap-start flex items-center justify-center">
    Section 1
  </section>
  <section className="h-screen snap-start flex items-center justify-center">
    Section 2
  </section>
  <section className="h-screen snap-start flex items-center justify-center">
    Section 3
  </section>
</div>
```

### 9.2 水平スクロールスナップ

```tsx
// カルーセル風スクロール
<div className="flex overflow-x-scroll snap-x snap-mandatory gap-6 pb-4">
  {items.map((item) => (
    <div
      key={item.id}
      className="flex-shrink-0 w-80 snap-center"
    >
      <Card>{item.content}</Card>
    </div>
  ))}
</div>
```

---

## 10. まとめ

レイアウトシステムの核心：

1. **Bento Grid** - モジュール型・非線形レイアウト
2. **レスポンシブリフロー** - モバイルファースト設計
3. **コンテナシステム** - 一貫した最大幅管理
4. **「間」のスペーシング** - 大きめの余白で呼吸空間
5. **セクション構造** - 再利用可能なセクションパターン
6. **Z-Index階層** - 予測可能な重なり順

### Tailwind設定

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
};
```

### レイアウトユーティリティ

```
src/components/
├── layout/
│   ├── Container.tsx    # コンテナラッパー
│   ├── Section.tsx      # セクションラッパー
│   ├── BentoGrid.tsx    # Bentoグリッド
│   └── Header.tsx       # ヘッダー
└── ui/
    └── BentoCard.tsx    # Bentoカード
```
