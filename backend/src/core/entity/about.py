"""About Entity - ドメインモデル"""
from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Education:
    """学歴のドメインモデル"""
    institution: str
    degree: str
    field: str
    start_date: str
    end_date: str
    description: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> "Education":
        """辞書からEducationエンティティを生成"""
        return cls(
            institution=data["institution"],
            degree=data["degree"],
            field=data["field"],
            start_date=data["start_date"],
            end_date=data["end_date"],
            description=data.get("description")
        )

    def to_dict(self) -> dict:
        """Educationエンティティを辞書に変換"""
        return {
            "institution": self.institution,
            "degree": self.degree,
            "field": self.field,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "description": self.description
        }


@dataclass
class Experience:
    """職歴のドメインモデル"""
    company: str
    position: str
    start_date: str
    end_date: str
    description: Optional[str] = None
    achievements: Optional[List[str]] = None

    @classmethod
    def from_dict(cls, data: dict) -> "Experience":
        """辞書からExperienceエンティティを生成"""
        return cls(
            company=data["company"],
            position=data["position"],
            start_date=data["start_date"],
            end_date=data["end_date"],
            description=data.get("description"),
            achievements=data.get("achievements")
        )

    def to_dict(self) -> dict:
        """Experienceエンティティを辞書に変換"""
        return {
            "company": self.company,
            "position": self.position,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "description": self.description,
            "achievements": self.achievements
        }


@dataclass
class SocialMedia:
    """SNSのドメインモデル"""
    platform: str
    url: str
    username: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> "SocialMedia":
        """辞書からSocialMediaエンティティを生成"""
        return cls(
            platform=data["platform"],
            url=data["url"],
            username=data.get("username")
        )

    def to_dict(self) -> dict:
        """SocialMediaエンティティを辞書に変換"""
        return {
            "platform": self.platform,
            "url": self.url,
            "username": self.username
        }


@dataclass
class About:
    """Aboutプロフィールのドメインモデル"""
    name: str
    title: str
    summary: str
    profile_image: str
    bio: str
    education: List[Education]
    experience: List[Experience]
    social_media: List[SocialMedia]

    @classmethod
    def from_dict(cls, data: dict) -> "About":
        """辞書からAboutエンティティを生成"""
        return cls(
            name=data["name"],
            title=data["title"],
            summary=data["summary"],
            profile_image=data["profile_image"],
            bio=data["bio"],
            education=[Education.from_dict(edu) for edu in data.get("education", [])],
            experience=[Experience.from_dict(exp) for exp in data.get("experience", [])],
            social_media=[SocialMedia.from_dict(sm) for sm in data.get("social_media", [])]
        )

    def to_dict(self) -> dict:
        """Aboutエンティティを辞書に変換"""
        return {
            "name": self.name,
            "title": self.title,
            "summary": self.summary,
            "profile_image": self.profile_image,
            "bio": self.bio,
            "education": [edu.to_dict() for edu in self.education],
            "experience": [exp.to_dict() for exp in self.experience],
            "social_media": [sm.to_dict() for sm in self.social_media]
        }
