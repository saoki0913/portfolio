from pydantic import BaseModel
from typing import Optional


class HeroIntroduction(BaseModel):
    id: str
    content: str


class TimelineItem(BaseModel):
    id: str
    period: str
    title: str
    subtitle: Optional[str] = None
    sort_order: int
