from pydantic import BaseModel


class Work(BaseModel):
    id: int
    title: str
    description: str
    tech_stack: list[str]
    github_url: str | None = None
    demo_url: str | None = None
    image_url: str | None = None
    order_index: int
