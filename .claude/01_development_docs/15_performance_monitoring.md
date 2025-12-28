# パフォーマンス監視

## 1. 監視ツール

### 1.1 Vercel Analytics

**自動有効化**:
- Core Web Vitals（LCP, FID, CLS）
- ページロード時間
- ユーザー数

**設定**:
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

### 1.2 Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push]

jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

---

## 2. 監視指標

| 指標 | 目標 | アラート閾値 |
|------|------|-------------|
| LCP | < 2.5秒 | > 3秒 |
| FID | < 100ms | > 200ms |
| CLS | < 0.1 | > 0.2 |
| Lighthouse Score | 90点以上 | < 85点 |

---

## 3. まとめ

Vercel Analytics + Lighthouse CIで継続的にパフォーマンス監視。
目標値を下回った場合は即座に対応する。
