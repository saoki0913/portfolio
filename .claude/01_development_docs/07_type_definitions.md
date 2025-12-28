# 型定義

## 1. 概要

### 1.1 型システムの重要性

このプロジェクトでは、**TypeScript（フロントエンド）** と **Pydantic（バックエンド）** で型定義を厳密に同期させることで、以下を実現:

1. **型安全性**: コンパイル時のエラー検出
2. **自動補完**: IDE サポート向上
3. **リファクタリング容易性**: 型変更時の影響範囲を自動追跡
4. **ドキュメント**: 型定義自体がAPIドキュメントとして機能

### 1.2 型定義の管理方針

**マスター型定義**: 本ドキュメントで一元管理
**同期ルール**: フロントエンドとバックエンドで型定義を変更する際は、必ず本ドキュメントを更新し、両方に反映

---

## 2. Works（作品情報）型定義

### 2.1 Backend (Pydantic)

```python
# backend/app/schemas/work.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class ScreenshotBase(BaseModel):
    url: str
    caption: Optional[str] = None

class ScreenshotCreate(ScreenshotBase):
    pass

class Screenshot(ScreenshotBase):
    id: int

    class Config:
        orm_mode = True

class WorkBase(BaseModel):
    title: str
    description: str
    thumbnail: str
    category: Optional[str] = None
    duration: Optional[str] = None
    role: Optional[str] = None
    learnings: Optional[str] = None

class WorkCreate(WorkBase):
    technologies: List[str]
    screenshots: List[ScreenshotCreate] = []
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    blog_url: Optional[str] = None

class WorkLinks(BaseModel):
    github: Optional[str] = None
    demo: Optional[str] = None
    blog: Optional[str] = None

class Work(WorkBase):
    id: str
    technologies: List[str]
    screenshots: List[Screenshot] = []
    links: Optional[WorkLinks] = None

    class Config:
        orm_mode = True

class WorkListResponse(BaseModel):
    works: List[Work]
```

### 2.2 Frontend (TypeScript)

```typescript
// frontend/src/lib/types/work.ts

export interface Screenshot {
  id: number;
  url: string;
  caption?: string;
}

export interface WorkLinks {
  github?: string;
  demo?: string;
  blog?: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category?: string;
  duration?: string;
  role?: string;
  learnings?: string;
  technologies: string[];
  screenshots: Screenshot[];
  links?: WorkLinks;
}

export interface WorkListResponse {
  works: Work[];
}
```

---

## 3. Skills（スキル情報）型定義

### 3.1 Backend (Pydantic)

```python
# backend/app/schemas/skill.py
from pydantic import BaseModel
from typing import List, Optional

class SkillBase(BaseModel):
    name: str
    level: int
    icon: Optional[str] = None
    description: Optional[str] = None

class SkillCreate(SkillBase):
    category: str

class Skill(SkillBase):
    id: int
    category: str

    class Config:
        orm_mode = True

class SkillCategoryBase(BaseModel):
    name: str

class SkillCategoryCreate(SkillCategoryBase):
    pass

class SkillCategory(SkillCategoryBase):
    id: int
    skills: List[Skill] = []

    class Config:
        orm_mode = True

class SkillListResponse(BaseModel):
    categories: List[SkillCategory]
```

### 3.2 Frontend (TypeScript)

```typescript
// frontend/src/lib/types/skill.ts

export interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
  icon?: string;
  description?: string;
  category: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: Skill[];
}

export interface SkillListResponse {
  categories: SkillCategory[];
}
```

---

## 4. About（プロフィール情報）型定義

### 4.1 Backend (Pydantic)

```python
# backend/app/schemas/about.py
from typing import List, Optional, Union
from pydantic import BaseModel

class EducationBase(BaseModel):
    institution: str
    degree: str
    field: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None

class EducationCreate(EducationBase):
    pass

class Education(EducationBase):
    id: Union[int, str]  # Mock Modeでは文字列、Supabaseでは整数

    class Config:
        orm_mode = True

class ExperienceBase(BaseModel):
    company: str
    position: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None

class ExperienceCreate(ExperienceBase):
    pass

class Experience(ExperienceBase):
    id: Union[int, str]

    class Config:
        orm_mode = True

class SocialMediaBase(BaseModel):
    platform: str
    url: str
    username: Optional[str] = None

class SocialMediaCreate(SocialMediaBase):
    pass

class SocialMedia(SocialMediaBase):
    id: Union[int, str]

    class Config:
        orm_mode = True

class AboutBase(BaseModel):
    name: str
    title: str
    summary: str
    profile_image: str
    bio: str

class AboutCreate(AboutBase):
    education: List[EducationCreate] = []
    experience: List[ExperienceCreate] = []
    social_media: List[SocialMediaCreate] = []

class About(AboutBase):
    id: Union[int, str]
    education: List[Education] = []
    experience: List[Experience] = []
    social_media: List[SocialMedia] = []

    class Config:
        orm_mode = True
```

### 4.2 Frontend (TypeScript)

```typescript
// frontend/src/lib/types/about.ts

export interface Education {
  id: number | string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

export interface Experience {
  id: number | string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
  achievements?: string[];
}

export interface SocialMedia {
  id: number | string;
  platform: string;
  url: string;
  username?: string;
}

export interface About {
  id: number | string;
  name: string;
  title: string;
  summary: string;
  profile_image: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  social_media: SocialMedia[];
}
```

---

## 5. Hero（ヒーローセクション）型定義

### 5.1 Backend (Pydantic)

```python
# backend/app/schemas/hero.py
from pydantic import BaseModel
from typing import List, Optional

class HeroIntroduction(BaseModel):
    id: str
    content: str

class HeroIntroductionResponse(BaseModel):
    introductions: List[HeroIntroduction]

class TimelineItem(BaseModel):
    id: str
    period: str
    title: str
    subtitle: Optional[str] = None
    sort_order: int

class TimelineItemResponse(BaseModel):
    items: List[TimelineItem]
```

### 5.2 Frontend (TypeScript)

```typescript
// frontend/src/lib/types/hero.ts

export interface HeroIntroduction {
  id: string;
  content: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle?: string;
  sort_order: number;
}
```

---

## 6. Contact（お問い合わせ）型定義

### 6.1 Backend (Pydantic)

```python
# backend/app/schemas/contact.py
from pydantic import BaseModel, EmailStr

class ContactRequest(BaseModel):
    name: str
    email: EmailStr  # 自動メール形式バリデーション
    subject: str
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str
```

### 6.2 Frontend (TypeScript)

```typescript
// frontend/src/lib/types/contact.ts

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
```

---

## 7. 型定義の更新手順

### 7.1 型を追加・変更する場合

1. **本ドキュメントを更新**
   - マスター型定義として本ドキュメントに追加・変更を記載

2. **Backend (Pydantic) を更新**
   - `backend/app/schemas/*.py` を修正
   - FastAPI 自動ドキュメント（`/docs`）で確認

3. **Frontend (TypeScript) を更新**
   - `frontend/src/lib/types/*.ts` を修正
   - `tsc` でコンパイルエラーがないか確認

4. **レビュー**
   - フロントエンドとバックエンドの型が一致していることを確認
   - API レスポンスと TypeScript 型が一致していることを確認

### 7.2 チェックリスト

- [ ] 本ドキュメント（07_type_definitions.md）を更新
- [ ] Backend Pydantic スキーマ更新
- [ ] Frontend TypeScript 型定義更新
- [ ] 型の一致を確認（Optional, List, Union等）
- [ ] API ドキュメント（/docs）で確認
- [ ] tsc コンパイルエラーなし

---

## 8. 型安全性のベストプラクティス

### 8.1 Optional型の統一

**Backend**:
```python
from typing import Optional
category: Optional[str] = None
```

**Frontend**:
```typescript
category?: string;
```

### 8.2 配列型の統一

**Backend**:
```python
from typing import List
technologies: List[str]
```

**Frontend**:
```typescript
technologies: string[];
```

### 8.3 Union型の統一

**Backend**:
```python
from typing import Union
id: Union[int, str]
```

**Frontend**:
```typescript
id: number | string;
```

### 8.4 ネストされた型

**Backend**:
```python
class Work(BaseModel):
    links: Optional[WorkLinks] = None
    screenshots: List[Screenshot] = []
```

**Frontend**:
```typescript
interface Work {
  links?: WorkLinks;
  screenshots: Screenshot[];
}
```

---

## 9. 型定義の拡張（Phase 2）

### 9.1 認証型（将来実装）

**Backend**:
```python
class User(BaseModel):
    id: str
    email: EmailStr
    is_admin: bool

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
```

**Frontend**:
```typescript
interface User {
  id: string;
  email: string;
  is_admin: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}
```

---

## 10. まとめ

このドキュメントは、フロントエンドとバックエンド間の型定義の **マスター** として機能する。

**重要原則**:
1. **型の一致**: TypeScript ↔ Pydantic で厳密に同期
2. **一元管理**: 本ドキュメントで型定義を管理
3. **更新手順の遵守**: 変更時は両方に反映
4. **レビューの徹底**: 型不一致はバグの温床

型定義の一致により、コンパイル時にAPIの不整合を検出し、ランタイムエラーを最小化する。
