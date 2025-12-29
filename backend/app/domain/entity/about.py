from pydantic import BaseModel
from typing import Optional
from datetime import date


class About(BaseModel):
    id: int
    name: str
    title: str
    summary: str
    profile_image: str
    bio: str


class Education(BaseModel):
    id: int
    about_id: Optional[int] = None
    institution: str
    degree: str
    field: str
    start_date: date
    end_date: Optional[date] = None
    description: Optional[str] = None


class Experience(BaseModel):
    id: int
    about_id: Optional[int] = None
    company: str
    position: str
    start_date: date
    end_date: Optional[date] = None
    description: Optional[str] = None
    achievements: Optional[list[str]] = None


class SocialMedia(BaseModel):
    id: int
    about_id: Optional[int] = None
    platform: str
    url: str
    username: Optional[str] = None


class AboutResponse(BaseModel):
    about: About
    education: list[Education]
    experience: list[Experience]
    social_media: list[SocialMedia]
