from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

work_technology = Table(
    "work_technologies",
    Base.metadata,
    Column("work_id", Integer, ForeignKey("works.id")),
    Column("technology", String),
)

class Technology(Base):
    __tablename__ = "technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class Screenshot(Base):
    __tablename__ = "screenshots"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    caption = Column(String, nullable=True)
    work_id = Column(Integer, ForeignKey("works.id"))
    
    work = relationship("Work", back_populates="screenshots")

class Work(Base):
    __tablename__ = "works"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    thumbnail = Column(String)
    category = Column(String, nullable=True)
    duration = Column(String, nullable=True)
    role = Column(String, nullable=True)
    learnings = Column(Text, nullable=True)
    github_url = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    blog_url = Column(String, nullable=True)
    
    screenshots = relationship("Screenshot", back_populates="work")
    technologies = relationship("Technology", secondary=work_technology) 
