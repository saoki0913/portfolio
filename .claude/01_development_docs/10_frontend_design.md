# フロントエンド設計

## 1. 概要

### 1.1 技術スタック

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Type System**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI
- **Animation**: Framer Motion 12
- **Form**: React Hook Form + Zod
- **Icons**: Lucide React
- **HTTP Client**: Axios

### 1.2 設計原則

1. **Server Components優先**: デフォルトはServer Component、必要な場合のみClient Component
2. **型安全性**: TypeScript厳格モード、Zodバリデーション
3. **アクセシビリティ**: Radix UI、セマンティックHTML、ARIA属性
4. **パフォーマンス**: コード分割、画像最適化、遅延ロード
5. **一貫性**: デザインシステムに従ったUI実装

---

## 2. ディレクトリ構造

```
frontend/src/
├── app/                          # App Router
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # ホームページ
│   ├── globals.css              # グローバルCSS
│   ├── error.tsx                # エラーページ
│   ├── not-found.tsx            # 404ページ
│   └── works/
│       └── [id]/
│           └── page.tsx         # 作品詳細ページ（動的ルート）
├── components/                   # コンポーネント
│   ├── ui/                      # 汎用UIコンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── animated-counter.tsx
│   │   ├── tilt-card.tsx
│   │   ├── expandable-skill-card.tsx
│   │   ├── expandable-timeline-card.tsx
│   │   └── section-divider.tsx
│   ├── sections/                # ページセクション
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Works.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── project-detail-layout.tsx
│   ├── cursor-glow.tsx
│   └── ContactForm.tsx
├── lib/                          # ユーティリティ・ロジック
│   ├── api/                     # APIクライアント
│   │   ├── client.ts
│   │   ├── works.ts
│   │   ├── skills.ts
│   │   ├── about.ts
│   │   ├── hero.ts
│   │   └── contact.ts
│   ├── types/                   # TypeScript型定義
│   │   ├── work.ts
│   │   ├── skill.ts
│   │   ├── about.ts
│   │   └── contact.ts
│   ├── utils.ts                 # 汎用ユーティリティ
│   └── animation-utils.ts       # アニメーションヘルパー
└── hooks/                        # カスタムフック
    └── use-mobile.tsx
```

---

## 3. コンポーネント設計

### 3.1 コンポーネント分類

#### UI Components (`/components/ui`)

**責務**: 汎用的な再利用可能UIコンポーネント

**特徴**:
- Radix UIベース
- アクセシビリティ対応
- Tailwind CSS + CVAでスタイリング
- Props経由でカスタマイズ可能

**例**:
```typescript
// components/ui/button.tsx
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ variant, size, children }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }))}>{children}</button>;
}
```

---

#### Section Components (`/components/sections`)

**責務**: ページの各セクション（Hero, About, Skills等）

**特徴**:
- 基本はServer Component
- データフェッチング含む
- セクション単位の独立性

**例（Server Component）**:
```typescript
// components/sections/Hero.tsx
import { getHeroIntroduction, getTimelineItems } from '@/lib/api/hero';

export default async function Hero() {
  const [introductions, timeline] = await Promise.all([
    getHeroIntroduction(),
    getTimelineItems(),
  ]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold">Shunsuke Aoki</h1>
        <p className="text-xl text-gray-600">{introductions[0]?.content}</p>
        {/* Timeline表示 */}
      </div>
    </section>
  );
}
```

**例（Client Component）**:
```typescript
// components/sections/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/schemas/contact';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // API送信
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* フォームフィールド */}
    </form>
  );
}
```

---

### 3.2 Server vs Client Components

#### Server Components（デフォルト）

**使用場面**:
- データフェッチング
- 静的コンテンツ表示
- SEO重要なページ

**メリット**:
- JavaScriptバンドルサイズ削減
- 初回ロード高速化
- SEO最適化

**例**:
- Hero, About, Skills, Works セクション
- layout.tsx, page.tsx

---

#### Client Components (`'use client'`)

**使用場面**:
- イベントハンドラー（onClick, onChange）
- React Hooks使用（useState, useEffect）
- ブラウザAPI使用（localStorage, window）
- Framer Motion使用

**例**:
- ContactForm
- アニメーション付きコンポーネント
- インタラクティブUI

---

### 3.3 Props設計

**原則**:
- 明確な型定義
- 必須プロパティを明示
- デフォルト値設定

**例**:
```typescript
interface WorkCardProps {
  work: Work;
  showDetails?: boolean; // オプショナル
  onCardClick?: (id: string) => void;
}

export function WorkCard({ work, showDetails = false, onCardClick }: WorkCardProps) {
  return <div onClick={() => onCardClick?.(work.id)}>{ /* ... */ }</div>;
}
```

---

## 4. 状態管理

### 4.1 基本方針

**グローバル状態管理ライブラリ（Redux, Zustand）は不使用**

**理由**:
- Server Components中心の設計
- 状態共有の必要性が低い
- オーバーエンジニアリング回避

---

### 4.2 状態管理パターン

#### パターン1: Server Componentsで直接フェッチ

```typescript
// app/page.tsx
import { getSkills } from '@/lib/api/skills';

export default async function Home() {
  const skillsData = await getSkills();

  return <Skills skills={skillsData} />;
}
```

#### パターン2: Client Componentsでローカル状態

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### パターン3: React Hook Formでフォーム状態

```typescript
'use client';

import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { register, handleSubmit, formState } = useForm();
  // フォーム状態はReact Hook Formで管理
}
```

---

## 5. スタイリング

### 5.1 Tailwind CSS

**基本方針**:
- ユーティリティクラス優先
- カスタムCSSは最小限
- デザインシステムに従う

**例**:
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
  Click me
</button>
```

### 5.2 Class Variance Authority (CVA)

**用途**: バリアント管理

```typescript
import { cva } from 'class-variance-authority';

const button = cva('px-4 py-2 rounded', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-800',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
  },
});

<button className={button({ intent: 'primary', size: 'large' })}>Click</button>
```

### 5.3 cn() ユーティリティ

**用途**: クラス名のマージ

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 使用例
<div className={cn('px-4 py-2', isDanger && 'bg-red-500', className)}>
```

---

## 6. アニメーション

### 6.1 Framer Motion

**原則**:
- パフォーマンス優先（`useReducedMotion`対応）
- アニメーションは控えめに
- `layoutId`でスムーズな遷移

**例**:
```typescript
'use client';

import { motion } from 'framer-motion';

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

### 6.2 useReducedMotion

```typescript
import { useReducedMotion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ x: shouldReduceMotion ? 0 : 100 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    />
  );
}
```

---

## 7. ルーティング

### 7.1 App Router

**ファイルシステムルーティング**:
- `app/page.tsx` → `/`
- `app/works/[id]/page.tsx` → `/works/work-1`

**動的ルート**:
```typescript
// app/works/[id]/page.tsx
export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getWorkById(params.id);
  return <div>{work.title}</div>;
}
```

### 7.2 ナビゲーション

```typescript
import Link from 'next/link';

<Link href="/works/work-1" className="text-blue-500 hover:underline">
  View Project
</Link>
```

---

## 8. データフェッチング

### 8.1 Server Componentsでのフェッチ

```typescript
// app/page.tsx
import { getWorks } from '@/lib/api/works';

export default async function Home() {
  const worksData = await getWorks();
  return <Works works={worksData.works} />;
}
```

### 8.2 並列フェッチング

```typescript
export default async function Home() {
  const [worksData, skillsData, aboutData] = await Promise.all([
    getWorks(),
    getSkills(),
    getAbout(),
  ]);

  return (
    <>
      <Hero />
      <About about={aboutData} />
      <Skills skills={skillsData} />
      <Works works={worksData.works} />
    </>
  );
}
```

---

## 9. フォーム

### 9.1 React Hook Form + Zod

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  name: z.string().min(1, '名前を入力してください'),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
}
```

---

## 10. パフォーマンス最適化

### 10.1 画像最適化

```typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={400}
  height={400}
  priority // LCP改善
/>
```

### 10.2 動的インポート

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

---

## 11. まとめ

フロントエンド設計の核心:

1. **Server Components優先** - SEO、パフォーマンス最適化
2. **型安全性** - TypeScript + Zod
3. **アクセシビリティ** - Radix UI、セマンティックHTML
4. **デザインシステム準拠** - Tailwind CSS + CVA
5. **パフォーマンス** - 画像最適化、コード分割

詳細なデザインシステムは `02_design_system/` を参照。
