# パフォーマンス最適化

## 1. パフォーマンス目標

### 1.1 Core Web Vitals目標値

| 指標 | 目標値 | 説明 |
|------|--------|------|
| LCP (Largest Contentful Paint) | < 2.5秒 | 最大コンテンツ描画時間 |
| FID (First Input Delay) | < 100ms | 初回入力遅延 |
| CLS (Cumulative Layout Shift) | < 0.1 | 累積レイアウトシフト |
| TTI (Time to Interactive) | < 3秒 | インタラクティブになるまでの時間 |
| Lighthouse Score | 90点以上 | 総合スコア |

---

## 2. フロントエンド最適化

### 2.1 Server Components活用

**戦略**: デフォルトはServer Component、必要な部分のみClient Component

**メリット**:
- JavaScriptバンドルサイズ削減
- 初回ロード高速化
- SEO最適化

**実装**:
```typescript
// app/page.tsx (Server Component)
import { getWorks } from '@/lib/api/works';

export default async function Home() {
  const worksData = await getWorks();  // サーバーサイドでフェッチ
  return <Works works={worksData.works} />;
}
```

---

### 2.2 画像最適化

#### next/image使用

```typescript
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={400}
  height={400}
  priority  // LCP改善（ファーストビュー画像）
  placeholder="blur"  // ローディング時のブラー
/>
```

#### 自動最適化機能

- **WebP/AVIF変換**: 自動的に最新フォーマットに変換
- **レスポンシブ画像**: デバイスサイズに応じた画像配信
- **遅延ロード**: ビューポート外の画像は遅延ロード（`priority`なし）

#### remotePatterns設定

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // 本番ではドメイン制限推奨
      },
    ],
  },
};
```

---

### 2.3 コード分割

#### 動的インポート

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false,  // クライアントサイドのみレンダリング
});
```

#### Framer Motionの遅延ロード

```typescript
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);
```

---

### 2.4 フォント最適化

#### next/font使用

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // FOUT回避
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

**メリット**:
- 自動サブセット化
- 自動プリロード
- レイアウトシフト回避

---

### 2.5 JavaScriptバンドル最適化

#### 不要なインポート削除

```typescript
// 悪い例
import _ from 'lodash';

// 良い例（tree-shaking可能）
import { debounce } from 'lodash-es';
```

#### バンドルサイズ分析

```bash
# @next/bundle-analyzer インストール
npm install --save-dev @next/bundle-analyzer

# package.json に追加
"scripts": {
  "analyze": "ANALYZE=true next build"
}

# 実行
npm run analyze
```

---

### 2.6 CSSの最適化

#### Tailwind CSS Purge

**自動有効化**: 本番ビルド時に未使用CSSを削除

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
};
```

---

## 3. バックエンド最適化

### 3.1 データベースクエリ最適化

#### N+1問題回避

```python
# 悪い例（N+1問題）
works = supabase.table("works").select("*").execute()
for work in works.data:
    technologies = supabase.table("work_technologies").select("technology").eq("work_id", work["id"]).execute()
    work["technologies"] = [t["technology"] for t in technologies.data]

# 良い例（一括取得）
works = supabase.table("works").select("*, work_technologies(technology)").execute()
```

#### インデックス活用

```sql
-- よく検索されるカラムにインデックス
CREATE INDEX idx_works_category ON works(category);
CREATE INDEX idx_skills_category_id ON skills(category_id);
```

---

### 3.2 Mock Dataフォールバック

**目的**: DB接続エラー時も高速レスポンス

```python
@router.get("", response_model=WorkListResponse)
def get_all_works(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA or supabase is None:
        return MOCK_WORKS_DATA  # 即座にレスポンス

    try:
        works = supabase.table("works").select("*").execute()
        return {"works": works.data}
    except Exception:
        return MOCK_WORKS_DATA  # フォールバック
```

---

### 3.3 Gzip圧縮（Uvicorn）

```bash
# Uvicorn起動時にGzip有効化
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**本番環境**: Render/Railwayが自動的にGzip圧縮を適用

---

## 4. ネットワーク最適化

### 4.1 HTTPリクエスト削減

#### 並列フェッチング

```typescript
// 悪い例（シーケンシャル）
const works = await getWorks();
const skills = await getSkills();
const about = await getAbout();

// 良い例（並列）
const [works, skills, about] = await Promise.all([
  getWorks(),
  getSkills(),
  getAbout(),
]);
```

#### API Rewrite（Next.js）

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
    },
  ];
}
```

**メリット**: Same-origin requestとなり、CORS preflight回避

---

### 4.2 CDN活用

**Vercel**: 自動的にグローバルCDN配信

- 静的アセット（画像、CSS、JS）
- Server Componentsの出力HTML

---

## 5. レンダリング最適化

### 5.1 Suspense Boundary

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**メリット**: 重いコンポーネントのローディング中も他の部分を表示

---

### 5.2 React.memo使用（Client Components）

```typescript
'use client';

import { memo } from 'react';

const HeavyComponent = memo(({ data }: { data: Data }) => {
  // 重い計算処理
  return <div>{data.value}</div>;
});
```

**注意**: Server Componentsでは不要（毎回新しいインスタンス）

---

### 5.3 useCallback, useMemo

```typescript
'use client';

import { useCallback, useMemo } from 'react';

export default function Component({ items }: { items: Item[] }) {
  // 重い計算をメモ化
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  // コールバック関数をメモ化
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <div onClick={handleClick}>{sortedItems.map(/* ... */)}</div>;
}
```

---

## 6. アニメーション最適化

### 6.1 Framer Motion最適化

#### transform/opacity優先

```typescript
// 良い例（GPU加速）
<motion.div
  animate={{ x: 100, opacity: 0.5 }}  // transform, opacityはGPU加速
/>

// 悪い例（Layout thrashing）
<motion.div
  animate={{ width: '100px', height: '100px' }}  // width, heightはreflow発生
/>
```

#### useReducedMotion対応

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

## 7. キャッシング戦略（Phase 2）

### 7.1 Redis導入

```python
# backend
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

@router.get("/works")
def get_all_works():
    # キャッシュチェック
    cached = redis_client.get("works_list")
    if cached:
        return json.loads(cached)

    # DB取得
    works = supabase.table("works").select("*").execute()

    # キャッシュ保存（TTL: 1時間）
    redis_client.setex("works_list", 3600, json.dumps(works.data))

    return {"works": works.data}
```

---

## 8. パフォーマンス測定

### 8.1 Lighthouse

```bash
# Lighthouse CLI
npm install -g lighthouse

# 実行
lighthouse http://localhost:3000 --view
```

### 8.2 Chrome DevTools

**Performance タブ**:
- フレームレート
- CPU使用率
- メモリ使用量

**Network タブ**:
- リクエスト数
- 転送サイズ
- ロード時間

---

## 9. まとめ

パフォーマンス最適化の核心:

1. **Server Components活用** - JavaScriptバンドル削減
2. **画像最適化** - next/image、WebP/AVIF
3. **コード分割** - 動的インポート
4. **並列フェッチング** - Promise.all
5. **アニメーション最適化** - transform/opacity優先
6. **キャッシング** - Redis（Phase 2）

継続的な測定とチューニングが重要。Lighthouse Score 90点以上を維持。
