# SEO要件

## 1. メタデータ設定

### 1.1 基本メタタグ

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Shunsuke Aoki | Robotics Researcher & Developer',
    template: '%s | Shunsuke Aoki',
  },
  description: '早稲田大学創造理工学研究科の修士1年生。AIロボティクス研究とWebエンジニアリングを専門とする。',
  keywords: ['Robotics', 'AI', 'Web Development', 'Next.js', 'FastAPI', '早稲田大学'],
  authors: [{ name: 'Shunsuke Aoki' }],
  creator: 'Shunsuke Aoki',
};
```

### 1.2 OGP（Open Graph Protocol）

```typescript
export const metadata: Metadata = {
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://portfolio.example.com',
    siteName: 'Shunsuke Aoki Portfolio',
    title: 'Shunsuke Aoki | Robotics Researcher & Developer',
    description: '早稲田大学創造理工学研究科の修士1年生...',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shunsuke Aoki Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shunsuke Aoki | Robotics Researcher & Developer',
    description: '早稲田大学創造理工学研究科の修士1年生...',
    images: ['/og-image.png'],
  },
};
```

---

## 2. 構造化データ（JSON-LD）

```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shunsuke Aoki',
    jobTitle: 'Robotics Researcher & Developer',
    url: 'https://portfolio.example.com',
    sameAs: [
      'https://github.com/shunsuke-aoki',
    ],
  };

  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

---

## 3. サイトマップ

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://portfolio.example.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://portfolio.example.com/works/work-1',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

---

## 4. robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://portfolio.example.com/sitemap.xml',
  };
}
```

---

## 5. セマンティックHTML

```tsx
<article>
  <header>
    <h1>Portfolio Website</h1>
  </header>
  <section>
    <h2>About</h2>
    <p>...</p>
  </section>
</article>
```

---

## 6. パフォーマンス最適化（SEO向上）

- Server Components でHTML生成（Googlebot が即座にインデックス）
- LCP < 2.5秒
- モバイル最適化

---

## 7. まとめ

SEOの基本:
1. メタデータ設定（title, description, OGP）
2. 構造化データ（JSON-LD）
3. サイトマップ・robots.txt
4. セマンティックHTML
5. パフォーマンス最適化
