from pydantic import BaseModel
from typing import Optional


class Work(BaseModel):
    id: str
    title: str
    description: str
    thumbnail: str
    category: str
    featured: Optional[bool] = False
    technologies: list[str]
    github_link: Optional[str] = None
    demo_link: Optional[str] = None
    blog_link: Optional[str] = None
    screenshots: Optional[dict] = None
    duration: Optional[str] = None
    role: Optional[str] = None
    learnings: Optional[str] = None
