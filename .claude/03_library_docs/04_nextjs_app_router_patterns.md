# Next.js App Router パターン

## 1. Server vs Client Components

### 1.1 Server Component（デフォルト）

```tsx
// app/page.tsx (Server Component)
import { getWorks } from '@/lib/api/works';

export default async function Home() {
  const works = await getWorks();  // サーバーサイドフェッチ
  return <WorksList works={works} />;
}
```

### 1.2 Client Component

```tsx
'use client';  // クライアントコンポーネント宣言

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 2. データフェッチング

### 2.1 並列フェッチング

```tsx
const [works, skills, about] = await Promise.all([
  getWorks(),
  getSkills(),
  getAbout(),
]);
```

---

## 3. 動的ルート

```tsx
// app/works/[id]/page.tsx
export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getWorkById(params.id);

  if (!work) {
    notFound();  // 404ページへ
  }

  return <div>{work.title}</div>;
}
```

---

## 4. メタデータ

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'My Portfolio',
  description: '...',
};
```

---

## 5. エラーハンドリング

### 5.1 error.tsx

```tsx
// app/error.tsx
'use client';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  );
}
```

### 5.2 not-found.tsx

```tsx
// app/not-found.tsx
export default function NotFound() {
  return <div>ページが見つかりません</div>;
}
```

---

## 6. まとめ

App Routerの基本パターン:
1. Server Components優先
2. 並列データフェッチング
3. 動的ルート
4. メタデータ設定
5. エラーハンドリング
