# CI/CD設計

## 1. 概要

### 1.1 CI/CDツール

- **Frontend**: Vercel（自動デプロイ）
- **Backend**: Render/Railway（自動デプロイ）
- **CI**: GitHub Actions（リント、テスト）

---

## 2. GitHub Actions

### 2.1 Frontend CI

```yaml
# .github/workflows/frontend-ci.yml
name: Frontend CI

on:
  push:
    branches: [main, develop]
    paths:
      - 'frontend/**'
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run lint
      - run: cd frontend && npm run build
```

### 2.2 Backend CI

```yaml
# .github/workflows/backend-ci.yml
name: Backend CI

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.12'
      - run: cd backend && pip install -r requirements.txt
      - run: cd backend && pytest
```

---

## 3. 自動デプロイ

### 3.1 Vercel（Frontend）

**設定**:
- GitHub連携で自動デプロイ
- mainブランチプッシュ時に本番デプロイ
- PRごとにプレビューデプロイ

### 3.2 Render（Backend）

**設定**:
- GitHub連携で自動デプロイ
- mainブランチプッシュ時に自動デプロイ
- 環境変数設定

---

## 4. まとめ

CI/CDパイプライン:
1. プッシュ → GitHub Actions（リント、テスト）
2. テスト成功 → Vercel/Render自動デプロイ
3. プレビュー環境で確認 → 本番マージ