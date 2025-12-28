# Supabase パターン

## 1. 概要

Supabaseは、PostgreSQLベースのBaaS（Backend as a Service）。

---

## 2. 接続

### 2.1 Pythonクライアント

```python
# backend/app/database.py
from supabase import create_client, Client
from app.core.config import settings

supabase: Client | None = None

if settings.SUPABASE_URL and settings.SUPABASE_KEY:
    supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
```

---

## 3. クエリパターン

### 3.1 SELECT

```python
# 全件取得
works = supabase.table("works").select("*").execute()

# 条件付き取得
work = supabase.table("works").select("*").eq("id", work_id).execute()

# 単一レコード
work = supabase.table("works").select("*").eq("id", work_id).single().execute()
```

### 3.2 INSERT

```python
supabase.table("contact_messages").insert({
    "name": "Test",
    "email": "test@example.com",
    "message": "Hello"
}).execute()
```

### 3.3 JOIN（手動実装）

```python
# 作品取得
work = supabase.table("works").select("*").eq("id", work_id).single().execute()

# 技術取得
technologies = supabase.table("work_technologies").select("technology").eq("work_id", work_id).execute()

# マージ
work["technologies"] = [t["technology"] for t in technologies.data]
```

---

## 4. エラーハンドリング

```python
try:
    data = supabase.table("works").select("*").execute()
    return data.data
except Exception as e:
    print(f"Supabase error: {e}")
    return MOCK_DATA  # フォールバック
```

---

## 5. まとめ

Supabase Clientで簡潔にDB操作。
エラー時はMock Dataフォールバック。