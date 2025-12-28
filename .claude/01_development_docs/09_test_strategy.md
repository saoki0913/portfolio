# テスト戦略

## 1. テストピラミッド

```
        /\
       /E2E\         数: 少 / 実行時間: 長 / 信頼性: 高
      /------\
     /統合テスト\      数: 中 / 実行時間: 中 / 信頼性: 中
    /----------\
   / 単体テスト  \    数: 多 / 実行時間: 短 / 信頼性: 低
  /--------------\
```

---

## 2. Backend テスト（Pytest）

### 2.1 単体テスト

```python
# tests/test_works_api.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_works():
    response = client.get("/works")
    assert response.status_code == 200
    assert "works" in response.json()

def test_get_work_by_id():
    response = client.get("/works/work-1")
    assert response.status_code == 200
    assert response.json()["id"] == "work-1"
```

### 2.2 実行

```bash
cd backend
pytest
```

---

## 3. Frontend テスト（Jest + React Testing Library）

### 3.1 コンポーネントテスト

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### 3.2 実行

```bash
cd frontend
npm test
```

---

## 4. E2Eテスト（Playwright）

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('ホームページが正しく表示される', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Shunsuke Aoki');
});
```

---

## 5. まとめ

現状はMock Modeで開発中のため、テストは最小限。
Phase 2でテストカバレッジ向上を図る。
