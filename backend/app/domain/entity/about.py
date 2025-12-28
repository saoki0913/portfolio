from pydantic import BaseModel


class About(BaseModel):
    id: int
    bio: str


class Education(BaseModel):
    id: int
    institution: str
    degree: str
    start_year: str
    end_year: str | None = None
    order_index: int


class Experience(BaseModel):
    id: int
    company: str
    position: str
    start_year: str
    end_year: str | None = None
    description: str
    order_index: int


class SocialMedia(BaseModel):
    id: int
    platform: str
    url: str
    order_index: int


class AboutResponse(BaseModel):
    bio: str
    education: list[Education]
    experience: list[Experience]
    social_media: list[SocialMedia]
