# Radix UI パターン

## 1. 概要

Radix UIは、アクセシブルで高品質なReactコンポーネントライブラリ。

本プロジェクトでは、Radix UIをベースにカスタムUIコンポーネントを構築。

---

## 2. 使用コンポーネント

### 2.1 Label

```tsx
import * as Label from '@radix-ui/react-label';

<Label.Root htmlFor="email">
  Email
</Label.Root>
<input id="email" type="email" />
```

### 2.2 Slot

```tsx
import { Slot } from '@radix-ui/react-slot';

const Button = ({ asChild, children }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp>{children}</Comp>;
};

// 使用例
<Button asChild>
  <Link href="/works">View Works</Link>
</Button>
```

---

## 3. アクセシビリティ

Radix UIは自動的に:
- ARIA属性
- キーボードナビゲーション
- フォーカス管理

を提供する。

---

## 4. スタイリング

Radix UIはスタイルを提供しないため、Tailwind CSSでカスタマイズ。

```tsx
<Label.Root className="text-sm font-medium text-zinc-50">
  Label
</Label.Root>
```

---

## 5. まとめ

Radix UIでアクセシブルなUIコンポーネントを構築。
Tailwind CSSでスタイリング。
