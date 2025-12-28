"""Work Entity - ドメインモデル"""
from typing import Optional, List
from dataclasses import dataclass


@dataclass
class WorkLinks:
    """プロジェクトリンク情報"""
    github: Optional[str] = None
    demo: Optional[str] = None
    blog: Optional[str] = None


@dataclass
class Work:
    """プロジェクト作品のドメインモデル"""
    id: str
    title: str
    description: str
    thumbnail: str
    category: str
    featured: bool
    technologies: List[str]
    links: WorkLinks
    screenshots: Optional[List[dict]] = None
    duration: Optional[str] = None
    role: Optional[str] = None
    learnings: Optional[List[str]] = None

    @classmethod
    def from_dict(cls, data: dict) -> "Work":
        """辞書からWorkエンティティを生成"""
        links = WorkLinks(
            github=data.get("github_link"),
            demo=data.get("demo_link"),
            blog=data.get("blog_link")
        )

        return cls(
            id=data["id"],
            title=data["title"],
            description=data["description"],
            thumbnail=data["thumbnail"],
            category=data["category"],
            featured=data.get("featured", False),
            technologies=data.get("technologies", []),
            links=links,
            screenshots=data.get("screenshots"),
            duration=data.get("duration"),
            role=data.get("role"),
            learnings=data.get("learnings")
        )

    def to_dict(self) -> dict:
        """Workエンティティを辞書に変換"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "category": self.category,
            "featured": self.featured,
            "technologies": self.technologies,
            "links": {
                "github": self.links.github,
                "demo": self.links.demo,
                "blog": self.links.blog
            },
            "screenshots": self.screenshots,
            "duration": self.duration,
            "role": self.role,
            "learnings": self.learnings
        }
