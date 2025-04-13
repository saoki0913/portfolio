from typing import List, Optional
from pydantic import BaseModel, HttpUrl

class Education(BaseModel):
    institution: str
    degree: str
    field: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None
    
class Experience(BaseModel):
    company: str
    position: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None

class SocialMedia(BaseModel):
    platform: str
    url: str
    username: Optional[str] = None

class About(BaseModel):
    name: str
    title: str
    summary: str
    profile_image: str
    bio: str
    education: List[Education]
    experience: List[Experience]
    social_media: List[SocialMedia]
    
    class Config:
        schema_extra = {
            "example": {
                "name": "青木 俊輔",
                "title": "AIエンジニア / バックエンド開発者",
                "summary": "早稲田大学創造理工学研究科の修士1年生として、AIロボティクスの研究に従事。長期インターンでWebエンジニアとしてAIを活用したwebアプリケーション開発に努める。",
                "profile_image": "/profile.jpg",
                "bio": "プログラミングとAIに情熱を持つエンジニアです。大学では機械学習とロボット工学を専攻し、インターンシップではWebアプリケーション開発の経験を積んでいます。",
                "education": [
                    {
                        "institution": "早稲田大学",
                        "degree": "修士",
                        "field": "創造理工学研究科 総合機械工学専攻",
                        "start_date": "2025.4",
                        "end_date": "現在",
                        "description": "菅野研究室 認知ロボティクス研究"
                    }
                ],
                "experience": [
                    {
                        "company": "株式会社インテリジェントフォース",
                        "position": "AIエンジニア",
                        "start_date": "2024.10",
                        "end_date": "現在",
                        "description": "AIソリューション事業部にてAIモデルの開発と実装を担当",
                        "achievements": [
                            "自然言語処理モデルの実装と改良",
                            "APIの設計と開発"
                        ]
                    }
                ],
                "social_media": [
                    {
                        "platform": "GitHub",
                        "url": "https://github.com/username",
                        "username": "username"
                    }
                ]
            }
        } 
