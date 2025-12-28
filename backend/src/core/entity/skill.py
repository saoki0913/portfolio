"""Skill Entity - ドメインモデル"""
from typing import Optional, List
from dataclasses import dataclass


@dataclass
class Skill:
    """スキルのドメインモデル"""
    name: str
    level: int  # 1-5
    category: str
    icon: Optional[str] = None
    description: Optional[str] = None

    @classmethod
    def from_dict(cls, data: dict) -> "Skill":
        """辞書からSkillエンティティを生成"""
        return cls(
            name=data["name"],
            level=data["level"],
            category=data["category"],
            icon=data.get("icon"),
            description=data.get("description")
        )

    def to_dict(self) -> dict:
        """Skillエンティティを辞書に変換"""
        return {
            "name": self.name,
            "level": self.level,
            "category": self.category,
            "icon": self.icon,
            "description": self.description
        }


@dataclass
class SkillCategory:
    """スキルカテゴリのドメインモデル"""
    name: str
    skills: List[Skill]

    def to_dict(self) -> dict:
        """SkillCategoryを辞書に変換"""
        return {
            "name": self.name,
            "skills": [skill.to_dict() for skill in self.skills]
        }
