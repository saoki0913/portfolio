# セキュリティ設計

## 1. セキュリティ概要

### 1.1 セキュリティ方針

**基本原則**:
1. **最小権限の原則**: 必要最小限のアクセス権限
2. **多層防御**: 複数のセキュリティレイヤー
3. **入力検証**: すべてのユーザー入力を検証
4. **出力エスケープ**: XSS対策
5. **最新パッチ適用**: 依存関係の定期更新

---

## 2. OWASP Top 10対策

### 2.1 インジェクション対策

#### SQLインジェクション

**リスク**: データベースへの不正なクエリ実行

**対策**:
- Supabase Python Clientのパラメータ化クエリ使用（自動エスケープ）
- 生のSQLクエリを使用しない

**実装例**:
```python
# 安全な実装（Supabase Client）
work = supabase.table("works").select("*").eq("id", work_id).execute()

# 危険な実装（使用禁止）
# query = f"SELECT * FROM works WHERE id = '{work_id}'"  # SQL Injection脆弱性
```

---

### 2.2 XSS（Cross-Site Scripting）対策

#### Stored XSS

**リスク**: DBに保存された悪意あるスクリプトが実行される

**対策**:
- React の自動エスケープ機能（デフォルト安全）
- `dangerouslySetInnerHTML` の使用禁止
- サニタイゼーション（DOMPurify）

**実装例**:
```typescript
// 安全（Reactが自動エスケープ）
<div>{work.description}</div>

// 危険（使用禁止）
// <div dangerouslySetInnerHTML={{ __html: work.description }} />

// 必要な場合はDOMPurifyでサニタイズ
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(work.description) }} />
```

#### Reflected XSS

**リスク**: URLパラメータに含まれるスクリプトが実行される

**対策**:
- URLパラメータのバリデーション
- Reactの自動エスケープ

---

### 2.3 CSRF（Cross-Site Request Forgery）対策

**現状**: 認証なしのため CSRF リスクは低い

**Phase 2（認証導入時）**:
- CSRFトークン実装
- SameSite Cookie属性設定
- Refererヘッダー検証

---

### 2.4 CORS設定

**目的**: 不正なオリジンからのリクエストを防ぐ

**実装**:
```python
# backend/app/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # 開発環境
        "https://portfolio.vercel.app",  # 本番環境
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**注意**: `allow_origins=["*"]` は使用禁止（セキュリティリスク）

---

## 3. 認証・認可（Phase 2）

**現状**: 認証なし（ポートフォリオは公開情報）

**Phase 2（管理画面実装時）**:

### 3.1 Supabase Auth統合

```typescript
// frontend
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ログイン
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password',
});

// セッション確認
const { data: { session } } = await supabase.auth.getSession();
```

### 3.2 JWT検証

```python
# backend
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    # Supabase JWT検証
    user = supabase.auth.get_user(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user
```

---

## 4. 入力検証

### 4.1 Backend（Pydantic）

**原則**: すべてのリクエストボディを Pydantic で検証

```python
# app/schemas/contact.py
from pydantic import BaseModel, EmailStr, validator

class ContactRequest(BaseModel):
    name: str
    email: EmailStr  # 自動メール形式検証
    subject: str
    message: str

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('名前を入力してください')
        return v

    @validator('message')
    def message_min_length(cls, v):
        if len(v) < 10:
            raise ValueError('メッセージは10文字以上入力してください')
        return v
```

### 4.2 Frontend（Zod）

**原則**: フォーム送信前にクライアント側でもバリデーション

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

---

## 5. 環境変数管理

### 5.1 機密情報の保護

**原則**:
- 機密情報（APIキー、パスワード）は環境変数で管理
- `.env` ファイルは `.gitignore` に追加
- 本番環境変数は Vercel/Render のダッシュボードで設定

**Backend (.env)**:
```bash
# 機密情報
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=xxx  # Supabase Anon Key（公開OK）
SMTP_PASSWORD=xxx  # Gmail App Password（機密）

# Git管理禁止
.env
```

**Frontend (.env.local)**:
```bash
# 公開可能な情報のみ
NEXT_PUBLIC_API_URL=http://localhost:8000

# NEXT_PUBLIC_ プレフィックスはブラウザに公開される
# 機密情報は NEXT_PUBLIC_ を使用しない
```

---

## 6. HTTPS強制（本番環境）

### 6.1 Vercel（Frontend）

**デフォルトでHTTPS有効**:
- 自動的にHTTPSリダイレクト
- Let's Encrypt証明書自動更新

### 6.2 Render/Railway（Backend）

**HTTPS設定**:
- Renderは自動的にHTTPSを提供
- カスタムドメインも無料SSL証明書

---

## 7. レート制限（Phase 2）

**目的**: DDoS攻撃、スパム防止

### 7.1 Contact APIのレート制限

```python
# backend
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/contact")
@limiter.limit("5/minute")  # 1分間に5リクエストまで
async def send_contact_message(request: Request, contact: ContactRequest):
    # ...
```

---

## 8. ファイルアップロード（将来実装）

**Phase 2（画像アップロード機能追加時）**:

### 8.1 セキュリティ対策

1. **ファイルタイプ検証**: MIME Type + 拡張子チェック
2. **ファイルサイズ制限**: 最大5MB
3. **ウイルススキャン**: ClamAV統合
4. **ファイル名サニタイズ**: UUID使用

**実装例**:
```python
from fastapi import UploadFile

@app.post("/upload")
async def upload_file(file: UploadFile):
    # ファイルタイプ検証
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type")

    # ファイルサイズ制限（5MB）
    file.file.seek(0, 2)  # ファイル末尾に移動
    file_size = file.file.tell()
    if file_size > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large")

    # UUID でファイル名生成
    import uuid
    file_name = f"{uuid.uuid4()}.{file.filename.split('.')[-1]}"

    # Supabase Storageにアップロード
    supabase.storage.from_("images").upload(file_name, file.file)
```

---

## 9. セキュリティヘッダー

### 9.1 Next.js セキュリティヘッダー

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

---

## 10. 依存関係の脆弱性管理

### 10.1 npm audit（Frontend）

```bash
# 脆弱性スキャン
npm audit

# 自動修正
npm audit fix

# 強制修正（破壊的変更含む）
npm audit fix --force
```

### 10.2 pip-audit（Backend）

```bash
# pipx でインストール
pipx install pip-audit

# 脆弱性スキャン
pip-audit

# requirements.txtをスキャン
pip-audit -r requirements.txt
```

### 10.3 Dependabot（GitHub）

**自動更新**:
- GitHub Dependabotを有効化
- 脆弱性が見つかった依存関係の自動PR作成

---

## 11. ログ・監視

### 11.1 セキュリティログ

**記録対象**:
- 認証失敗（Phase 2）
- 不正なリクエスト（バリデーションエラー）
- レート制限違反（Phase 2）

**実装例**:
```python
import logging

logger = logging.getLogger(__name__)

@app.post("/contact")
async def send_contact_message(contact: ContactRequest):
    try:
        # ...
    except ValidationError as e:
        logger.warning(f"Validation error from {request.client.host}: {e}")
        raise
```

---

## 12. セキュリティチェックリスト

### 開発時

- [ ] 環境変数に機密情報を保存（コードにハードコーディングしない）
- [ ] `.env` ファイルを `.gitignore` に追加
- [ ] すべてのユーザー入力をバリデーション（Pydantic + Zod）
- [ ] `dangerouslySetInnerHTML` 使用禁止
- [ ] CORS設定で許可オリジンを明示
- [ ] SQLクエリはパラメータ化（Supabase Client使用）

### デプロイ前

- [ ] `npm audit` でフロントエンド脆弱性スキャン
- [ ] `pip-audit` でバックエンド脆弱性スキャン
- [ ] 本番環境変数が正しく設定されているか確認
- [ ] HTTPS有効化確認
- [ ] セキュリティヘッダー設定確認

### 定期メンテナンス

- [ ] 依存関係の定期更新（月1回）
- [ ] セキュリティログの監視
- [ ] Dependabot PRの確認・マージ

---

## 13. まとめ

セキュリティ設計の核心:

1. **入力検証の徹底** - Pydantic + Zod
2. **出力エスケープ** - React自動エスケープ
3. **HTTPS強制** - 本番環境
4. **環境変数管理** - 機密情報の保護
5. **依存関係の脆弱性管理** - npm audit, pip-audit, Dependabot

セキュリティは継続的な取り組みであり、定期的な見直しと更新が必要。