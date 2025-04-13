from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Education(Base):
    __tablename__ = "educations"
    
    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String)
    degree = Column(String)
    field = Column(String)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    description = Column(Text, nullable=True)
    about_id = Column(Integer, ForeignKey("abouts.id"))
    
    about = relationship("About", back_populates="education")

class Experience(Base):
    __tablename__ = "experiences"
    
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String)
    position = Column(String)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    description = Column(Text, nullable=True)
    achievements = Column(Text, nullable=True)  # JSONで保存
    about_id = Column(Integer, ForeignKey("abouts.id"))
    
    about = relationship("About", back_populates="experience")

class SocialMedia(Base):
    __tablename__ = "social_media"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String)
    url = Column(String)
    username = Column(String, nullable=True)
    about_id = Column(Integer, ForeignKey("abouts.id"))
    
    about = relationship("About", back_populates="social_media")

class About(Base):
    __tablename__ = "abouts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    title = Column(String)
    summary = Column(Text)
    profile_image = Column(String)
    bio = Column(Text)
    
    education = relationship("Education", back_populates="about")
    experience = relationship("Experience", back_populates="about")
    social_media = relationship("SocialMedia", back_populates="about") 
