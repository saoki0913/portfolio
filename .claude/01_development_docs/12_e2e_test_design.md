# E2Eテスト設計

## 1. E2Eテストツール

**Playwright**: クロスブラウザE2Eテストフレームワーク

---

## 2. クリティカルパス

### 2.1 ホームページ表示

```typescript
test('ホームページが正しく表示される', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Shunsuke Aoki');
});
```

### 2.2 作品詳細ページ遷移

```typescript
test('作品詳細ページへ遷移できる', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('a[href="/works/work-1"]');
  await expect(page).toHaveURL('/works/work-1');
});
```

### 2.3 コンタクトフォーム送信

```typescript
test('コンタクトフォームが送信できる', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[name="name"]', 'テスト太郎');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="subject"]', 'お問い合わせ');
  await page.fill('textarea[name="message"]', 'テストメッセージ');
  await page.click('button[type="submit"]');
  await expect(page.locator('.success')).toBeVisible();
});
```

---

## 3. 実行

```bash
cd frontend
npx playwright test
```

---

## 4. まとめ

E2Eテストは主要なユーザーフローに絞り、定期的に実行する。
