# テスト戦略

## 概要
現在のポートフォリオサイトでは、GitHub Actions CI/CDパイプラインによる継続的な検証を実施。本格的なテストフレームワークは今後の実装予定ですが、以下の基本的なテスト戦略を定義しています。

## テストツール

### フロントエンド（計画中）
- **テストフレームワーク**: Jest（Next.js標準）
- **コンポーネントテスト**: React Testing Library
- **E2Eテスト**: Playwright（予定）
- **型チェック**: TypeScript Compiler
- **リンター**: ESLint

### バックエンド（計画中）
- **テストフレームワーク**: pytest
- **非同期テスト**: pytest-asyncio
- **モック**: pytest-mock
- **HTTPクライアント**: httpx（テスト用）

### CI/CD検証（実装済み）
- **GitHub Actions**: 自動ビルド、型チェック、デプロイ確認
- **Linting**: Python Flake8、TypeScript ESLint
- **デプロイ確認**: Render/Vercelヘルスチェック

## テスト環境

### ローカル開発環境
```bash
# フロントエンド（frontend/）
npm run dev          # 開発サーバー起動
npm run build        # ビルドテスト
npm run lint         # ESLint（現在一時無効化）
npm run tsc          # TypeScript型チェック

# バックエンド（backend/）
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload  # 開発サーバー起動
```

### テストデータベース
- **本番**: Supabase Production Database
- **開発**: 同一データベース（RLSにより安全）
- **テスト**: モックリポジトリ使用（予定）

## テストコマンド（予定）

### フロントエンド
```bash
# 全テスト実行
npm test

# カバレッジ付きテスト
npm test -- --coverage

# 特定のテストファイル実行
npm test -- src/components/sections/Works.test.tsx

# Watch モード
npm test -- --watch
```

### バックエンド
```bash
# 全テスト実行
pytest

# 詳細出力付き
pytest -v

# 特定のテストファイル実行
pytest tests/test_work_service.py

# カバレッジ付きテスト
pytest --cov=src --cov-report=html
```

## CI/CD統合（実装済み）

### GitHub Actions ワークフロー
ファイル: `.github/workflows/ci-cd.yml`

#### 1. Backend Test & Validate
```yaml
backend-test:
  name: 🐍 Backend Test & Validate
  runs-on: ubuntu-latest
  steps:
    - name: Set up Python 3.11
      uses: actions/setup-python@v5
      with:
        python-version: '3.11'

    - name: Install dependencies
      working-directory: ./backend
      run: |
        pip install -r requirements.txt

    - name: Run Flake8
      working-directory: ./backend
      run: |
        pip install flake8
        flake8 src/ --count --max-line-length=120

    - name: Start FastAPI server
      working-directory: ./backend
      run: |
        uvicorn src.main:app &
        sleep 10
        curl http://localhost:8000/
```

#### 2. Frontend Test & Build
```yaml
frontend-test:
  name: ⚛️ Frontend Test & Build
  runs-on: ubuntu-latest
  steps:
    - name: Set up Node.js 20
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Install dependencies
      working-directory: ./frontend
      run: npm ci

    - name: Run TypeScript type check
      working-directory: ./frontend
      run: npm run tsc --noEmit

    - name: Build Next.js app
      working-directory: ./frontend
      run: npm run build
```

#### 3. Deployment Verification
```yaml
deploy-verification:
  name: 🚀 Deployment Verification
  needs: [backend-test, frontend-test]
  runs-on: ubuntu-latest
  steps:
    - name: Verify Render Backend
      run: |
        response=$(curl -s -o /dev/null -w "%{http_code}" $RENDER_BACKEND_URL)
        if [ $response -eq 200 ]; then
          echo "✅ Render backend is healthy (HTTP $response)"
        else
          echo "⚠️ Render backend returned HTTP $response"
          exit 1
        fi

    - name: Verify Vercel Frontend
      run: |
        response=$(curl -s -o /dev/null -w "%{http_code}" $VERCEL_FRONTEND_URL)
        if [ $response -eq 200 ]; then
          echo "✅ Vercel frontend is healthy (HTTP $response)"
        else
          echo "⚠️ Vercel frontend returned HTTP $response"
          exit 1
        fi
```

## テスト構造（予定）

### ディレクトリ構成
```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── sections/
│   │   │       └── Works.tsx
│   │   └── lib/
│   │       └── api/
│   │           └── works.ts
│   └── __tests__/
│       ├── components/
│       │   └── sections/
│       │       └── Works.test.tsx
│       └── lib/
│           └── api/
│               └── works.test.ts
└── backend/
    ├── src/
    │   ├── core/
    │   │   ├── service/
    │   │   └── repository/
    │   └── infra/
    │       └── repository/
    └── tests/
        ├── unit/
        │   ├── test_work_service.py
        │   └── test_skill_service.py
        └── integration/
            └── test_works_controller.py
```

## テストパターン（予定）

### フロントエンド: Componentテスト例
```typescript
// __tests__/components/sections/Works.test.tsx
import { render, screen } from '@testing-library/react';
import { Works } from '@/components/sections/Works';

describe('Works Component', () => {
  it('should render all works', () => {
    const mockWorks = [
      {
        id: 1,
        title: 'Eコマースプラットフォーム',
        description: 'フルスタックECサイト',
        tech_stack: ['Next.js', 'FastAPI'],
        github_url: 'https://github.com/...',
        demo_url: null,
        image_url: '/images/ecommerce.png',
        order_index: 1
      }
    ];

    render(<Works works={mockWorks} />);
    expect(screen.getByText('Eコマースプラットフォーム')).toBeInTheDocument();
  });
});
```

### フロントエンド: APIクライアントテスト例
```typescript
// __tests__/lib/api/works.test.ts
import { getAllWorks } from '@/lib/api/works';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Works API', () => {
  it('should fetch all works', async () => {
    const mockData = [{ id: 1, title: 'Test Work' }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const works = await getAllWorks();
    expect(works).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('/works');
  });
});
```

### バックエンド: Serviceテスト例
```python
# tests/unit/test_work_service.py
import pytest
from unittest.mock import AsyncMock
from src.core.service.work_service import WorkService
from src.core.entity.work import Work

@pytest.mark.asyncio
async def test_get_all_works():
    # Arrange
    mock_repository = AsyncMock()
    mock_repository.find_all.return_value = [
        Work(
            id=1,
            title="Eコマースプラットフォーム",
            description="フルスタックECサイト",
            tech_stack=["Next.js", "FastAPI"],
            github_url="https://github.com/...",
            demo_url=None,
            image_url="/images/ecommerce.png",
            order_index=1
        )
    ]
    service = WorkService(repository=mock_repository)

    # Act
    works = await service.get_all_works()

    # Assert
    assert len(works) == 1
    assert works[0].title == "Eコマースプラットフォーム"
    mock_repository.find_all.assert_called_once()
```

### バックエンド: Controllerテスト例
```python
# tests/integration/test_works_controller.py
import pytest
from httpx import AsyncClient
from src.main import app

@pytest.mark.asyncio
async def test_get_all_works_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/works")

        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        assert "title" in data[0]
        assert "tech_stack" in data[0]
```

## モック戦略（予定）

### フロントエンド
1. **Axiosモック**: API通信のモック化
2. **Next.js Image**: `next/image`コンポーネントのモック
3. **Framer Motion**: アニメーションライブラリのモック（スナップショットテスト用）

### バックエンド
1. **Supabaseクライアント**: `SupabaseClient`のモック化
2. **リポジトリ**: インターフェースベースのMock実装
3. **環境変数**: `Settings`クラスのモック

## テストカバレッジ目標

### 現状（未実装）
- フロントエンド: 0%
- バックエンド: 0%

### 目標（フェーズ2以降）
- **単体テスト**: 70%以上
  - Service層: 80%以上
  - Repository層: 70%以上
  - APIクライアント: 80%以上
- **結合テスト**: 主要フロー100%
  - 全APIエンドポイント
  - 主要コンポーネント
- **E2Eテスト**: クリティカルパス100%
  - ホームページ表示
  - Works詳細ページ遷移
  - お問い合わせフォーム送信

## 型チェック（実装済み）

### TypeScript型チェック
```bash
# frontend/
npm run tsc --noEmit
```

**GitHub Actionsで自動実行**:
- Pull Request作成時
- mainブランチへのpush時

### Python型ヒント（mypy導入予定）
```bash
# backend/
mypy src/ --strict
```

## リンター（実装済み）

### Python Flake8
```bash
# backend/
flake8 src/ --count --max-line-length=120
```

**設定**: `backend/.flake8`（予定）

### ESLint（一時無効化）
Next.js 16で`next lint`コマンドが削除されたため、現在は一時的に無効化。

**再有効化予定**: ESLint 9対応後

## E2Eテスト（計画中）

### Playwright使用
```bash
# frontend/
npm install -D @playwright/test
npx playwright install
```

### E2Eテストシナリオ例
```typescript
// e2e/works.spec.ts
import { test, expect } from '@playwright/test';

test('should navigate to work detail page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Eコマースプラットフォーム');
  await expect(page).toHaveURL(/.*\/works\/\d+/);
  await expect(page.locator('h1')).toContainText('Eコマースプラットフォーム');
});
```

## パフォーマンステスト（計画中）

### Lighthouse CI
```bash
# package.json
"scripts": {
  "lighthouse": "lighthouse http://localhost:3000 --view"
}
```

**目標スコア**:
- Performance: 90点以上
- Accessibility: 100点
- Best Practices: 90点以上
- SEO: 100点

## ベストプラクティス

### テスト作成ガイドライン
1. **AAA パターン**: Arrange-Act-Assert
2. **独立性**: 各テストは他に依存しない
3. **冪等性**: 何度実行しても同じ結果
4. **明確な名前**: `test_should_return_all_works_when_repository_has_data`
5. **1テスト1検証**: 複数の検証は分割

### モック使用指針
- 外部サービス（Supabase API）は必ずモック化
- リポジトリ層はインターフェースでモック
- 時間依存処理はfreezegun使用（予定）

## トラブルシューティング

### よくある問題（予定）
1. **モックが機能しない**: `jest.mock()`の位置確認
2. **非同期テスト失敗**: `await`忘れ、`pytest-asyncio`使用
3. **型エラー**: TypeScript設定、`tsconfig.json`確認

### デバッグ
```bash
# フロントエンド
npm test -- --verbose

# バックエンド
pytest -v -s  # -s: print出力表示
```

## 今後の実装予定

### Phase 1: 基本テスト実装（優先度: 高）
- [ ] Backend Service層の単体テスト
- [ ] Backend Controller層の結合テスト
- [ ] Frontend APIクライアントテスト

### Phase 2: コンポーネントテスト（優先度: 中）
- [ ] React Testing Libraryセットアップ
- [ ] 主要コンポーネントのテスト
- [ ] スナップショットテスト

### Phase 3: E2Eテスト（優先度: 低）
- [ ] Playwrightセットアップ
- [ ] クリティカルパステスト
- [ ] CI/CD統合
