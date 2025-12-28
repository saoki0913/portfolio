from pydantic import BaseModel


class HeroIntroduction(BaseModel):
    id: int
    introduction_text: str


class TimelineItem(BaseModel):
    id: int
    year: str
    title: str
    description: str
    order_index: int
