# エラーハンドリング設計

## 1. 概要

### 1.1 エラーハンドリングの目的

1. **ユーザー体験の向上**: 適切なエラーメッセージでユーザーを混乱させない
2. **デバッグの容易性**: ログから問題箇所を特定できる
3. **セキュリティ**: 内部実装の詳細を漏らさない
4. **回復可能性**: エラー発生時でもアプリケーションを継続動作させる

### 1.2 エラー分類

| 分類 | 説明 | 例 |
|------|------|-----|
| バリデーションエラー | 入力値の形式エラー | メールアドレス形式不正 |
| リソース未発見エラー | 要求されたリソースが存在しない | 作品IDが見つからない |
| サーバーエラー | サーバー側の処理エラー | DB接続失敗 |
| ネットワークエラー | 通信エラー | APIサーバーに接続できない |

---

## 2. Backend エラーハンドリング

### 2.1 HTTPExceptionの使用

**原則**: すべてのエラーは FastAPI の `HTTPException` を使用

```python
from fastapi import HTTPException

# 404 Not Found
raise HTTPException(status_code=404, detail="作品が見つかりません")

# 422 Unprocessable Entity（バリデーションエラー）
# → Pydantic が自動的に発行

# 500 Internal Server Error
raise HTTPException(status_code=500, detail="サーバーエラーが発生しました")
```

### 2.2 エラーレスポンス形式

**単一エラー**:
```json
{
  "detail": "作品が見つかりません"
}
```

**バリデーションエラー（Pydantic自動）**:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

### 2.3 エンドポイント別エラーハンドリング

#### GET /works/{work_id}

```python
@router.get("/{work_id}", response_model=Work)
def get_work_by_id(work_id: str, db: Session = Depends(get_db)):
    # Mock Mode チェック
    if settings.USE_MOCK_DATA or supabase is None:
        for work in MOCK_WORKS_DATA["works"]:
            if work["id"] == work_id:
                return work
        raise HTTPException(status_code=404, detail="作品が見つかりません")

    try:
        work_response = supabase.table("works").select("*").eq("id", work_id).single().execute()

        if not work_response.data:
            raise HTTPException(status_code=404, detail="作品が見つかりません")

        # データ整形
        work = work_response.data
        # ...

        return work

    except HTTPException:
        # 既に発行された HTTPException はそのまま再発行
        raise
    except Exception as e:
        # 予期しないエラーはログ出力 + 500エラー
        print(f"Error fetching work: {e}")
        raise HTTPException(status_code=500, detail="サーバーエラーが発生しました")
```

#### POST /contact

```python
@router.post("", response_model=ContactResponse)
async def send_contact_message(
    contact: ContactRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        background_tasks.add_task(send_email_background, contact)

        return {
            "success": True,
            "message": "お問い合わせを受け付けました。ありがとうございます。"
        }
    except Exception as e:
        print(f"Error in contact form: {e}")
        raise HTTPException(status_code=500, detail=str(e))
```

### 2.4 Mock Dataフォールバック

**原則**: DB接続エラー時はMock Dataを返却（エラーを発行しない）

```python
@router.get("", response_model=WorkListResponse)
def get_all_works(db: Session = Depends(get_db)):
    if settings.USE_MOCK_DATA or supabase is None:
        return MOCK_WORKS_DATA

    try:
        works_response = supabase.table("works").select("*").execute()
        # データ整形
        return {"works": works}
    except Exception as e:
        # エラー時もMock Dataフォールバック
        print(f"Error fetching from Supabase: {e}")
        return MOCK_WORKS_DATA
```

**理由**: 開発環境でDB未接続時でもフロントエンド開発を継続可能にする

### 2.5 ログ出力

**現状**: `print()` によるコンソール出力

**Phase 2**: Python `logging` モジュール導入

```python
import logging

logger = logging.getLogger(__name__)

try:
    # ...
except Exception as e:
    logger.error(f"Error fetching work: {e}", exc_info=True)
    raise HTTPException(status_code=500, detail="サーバーエラーが発生しました")
```

---

## 3. Frontend エラーハンドリング

### 3.1 Axios インターセプター

```typescript
// frontend/src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // サーバーがレスポンスを返した場合
      const status = error.response.status;
      const detail = error.response.data?.detail || '予期しないエラーが発生しました';

      switch (status) {
        case 404:
          console.error('リソースが見つかりません:', detail);
          break;
        case 422:
          console.error('バリデーションエラー:', detail);
          break;
        case 500:
          console.error('サーバーエラー:', detail);
          break;
        default:
          console.error('エラー:', detail);
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error('ネットワークエラー: サーバーに接続できません');
    } else {
      // リクエスト設定時のエラー
      console.error('リクエストエラー:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3.2 API関数でのエラーハンドリング

```typescript
// frontend/src/lib/api/works.ts
import apiClient from './client';
import type { Work } from '@/lib/types/work';

export async function getWorkById(id: string): Promise<Work | null> {
  try {
    const response = await apiClient.get<Work>(`/works/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // 404エラーは null を返す（エラーをスローしない）
      return null;
    }
    // その他のエラーは再スロー
    throw error;
  }
}
```

### 3.3 Server Componentsでのエラーハンドリング

```typescript
// frontend/src/app/works/[id]/page.tsx
import { getWorkById } from '@/lib/api/works';
import { notFound } from 'next/navigation';

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getWorkById(params.id);

  if (!work) {
    notFound(); // Next.js の 404 ページを表示
  }

  return (
    <div>
      <h1>{work.title}</h1>
      {/* ... */}
    </div>
  );
}
```

**Next.js error.tsx** (オプション):
```typescript
// frontend/src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>再試行</button>
    </div>
  );
}
```

### 3.4 Client Componentsでのエラーハンドリング

```typescript
// frontend/src/components/sections/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendContactMessage } from '@/lib/api/contact';
import type { ContactRequest } from '@/lib/types/contact';

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactRequest>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactRequest) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await sendContactMessage(data);
      setSuccess(response.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail || '送信に失敗しました';
        setError(typeof detail === 'string' ? detail : '送信に失敗しました');
      } else {
        setError('予期しないエラーが発生しました');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* フォームフィールド */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
}
```

---

## 4. バリデーションエラーハンドリング

### 4.1 Backend (Pydantic)

**自動バリデーション**:
```python
# app/schemas/contact.py
from pydantic import BaseModel, EmailStr

class ContactRequest(BaseModel):
    name: str
    email: EmailStr  # 自動メール形式チェック
    subject: str
    message: str
```

**エラーレスポンス（自動生成）**:
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

### 4.2 Frontend (Zod + React Hook Form)

```typescript
// frontend/src/schemas/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上入力してください'),
});
```

**React Hook Formでの使用**:
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<ContactRequest>({
  resolver: zodResolver(contactSchema),
});

// エラー表示
{errors.email && <span>{errors.email.message}</span>}
```

---

## 5. エラーメッセージ設計

### 5.1 ユーザー向けメッセージ

**原則**:
- 明確で理解しやすい日本語
- 技術用語を避ける
- 次のアクションを示唆

**良い例**:
```
✅ "作品が見つかりません"
✅ "メールアドレスの形式が正しくありません"
✅ "お問い合わせを受け付けました。ありがとうございます。"
```

**悪い例**:
```
❌ "404 Not Found"
❌ "value_error.email"
❌ "Internal Server Error"
```

### 5.2 開発者向けログ

**原則**:
- 詳細なエラー情報（スタックトレース）
- エラー発生箇所の特定情報
- デバッグに必要な context

**例**:
```python
logger.error(f"Error fetching work {work_id}: {e}", exc_info=True)
```

---

## 6. エラー境界（Error Boundaries）

### 6.1 Next.js error.tsx

```typescript
// frontend/src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログを送信（将来実装）
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
      <p className="text-gray-600 mb-4">申し訳ございません。問題が発生しました。</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        再試行
      </button>
    </div>
  );
}
```

### 6.2 not-found.tsx

```typescript
// frontend/src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">ページが見つかりません</h2>
      <p className="text-gray-600 mb-4">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href="/" className="text-blue-500 hover:underline">
        ホームに戻る
      </Link>
    </div>
  );
}
```

---

## 7. エラー監視（Phase 2）

### 7.1 Sentry統合

```typescript
// frontend/src/app/layout.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

```python
# backend/app/main.py
import sentry_sdk

sentry_sdk.init(
    dsn=settings.SENTRY_DSN,
    traces_sample_rate=1.0,
)
```

---

## 8. まとめ

エラーハンドリング設計の原則:

1. **ユーザー体験優先**: 明確で理解しやすいメッセージ
2. **デバッグ容易性**: 詳細なログ出力
3. **セキュリティ**: 内部実装の詳細を漏らさない
4. **回復可能性**: Mock Dataフォールバック、エラー境界
5. **一貫性**: すべてのエンドポイントで統一されたエラーレスポンス

エラーは避けられないが、適切なハンドリングでユーザー体験を損なわないようにする。
