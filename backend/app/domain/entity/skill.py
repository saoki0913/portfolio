from pydantic import BaseModel
from typing import Optional


class Skill(BaseModel):
    id: int
    name: str
    level: int
    category: str
    icon: Optional[str] = None
    description: Optional[str] = None
