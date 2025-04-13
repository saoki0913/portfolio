from pydantic import BaseModel, EmailStr, Field

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    
    class Config:
        schema_extra = {
            "example": {
                "name": "山田 太郎",
                "email": "example@example.com",
                "subject": "お仕事の依頼について",
                "message": "ポートフォリオを拝見しました。新しいプロジェクトについて相談させていただきたいと思います。"
            }
        }

class ContactResponse(BaseModel):
    success: bool
    message: str 
