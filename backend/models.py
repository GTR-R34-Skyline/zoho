from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    avatar = Column(String, nullable=True)
    initials = Column(String)
    password_hash = Column(String, nullable=True)
    participation_score = Column(Integer, default=0)
    learning_path_status = Column(String, default="Not Started")
    primary_skill = Column(String, nullable=True)
    learning_path_id = Column(Integer, ForeignKey("learning_paths.id"), nullable=True)
    skills = Column(JSON, default=list) # List of dicts or strings
    interests = Column(JSON, default=list)
    joined_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tasks = relationship("Task", back_populates="assignee")
    learning_path = relationship("LearningPath", back_populates="members")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="Pending")
    priority = Column(String, default="Medium")
    due_date = Column(DateTime, nullable=True)
    skill_focus = Column(String, default="General")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    assigned_to = Column(Integer, ForeignKey("members.id"), nullable=True)
    assignee = relationship("Member", back_populates="tasks")
    
    path_id = Column(Integer, ForeignKey("learning_paths.id"), nullable=True)
    path = relationship("LearningPath", back_populates="tasks")
    
    logs = Column(JSON, default=list)

class LearningPath(Base):
    __tablename__ = "learning_paths"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    difficulty = Column(String)
    skill_tags = Column(JSON, default=list)
    estimated_duration = Column(String)
    completion_rate = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    modules = Column(JSON, default=list)
    
    tasks = relationship("Task", back_populates="path")
    members = relationship("Member", back_populates="learning_path")

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    type = Column(String)
    description = Column(String)
    metadata_json = Column(JSON, default=dict) # 'metadata' is reserved in SQLAlchemy sometimes
    created_at = Column(DateTime, default=datetime.utcnow)

class Settings(Base):
    __tablename__ = "settings"
    
    id = Column(Integer, primary_key=True, index=True)
    theme = Column(String, default="black-blue")
    accent_color = Column(String, default="#3B82F6")
    bot_enabled = Column(Boolean, default=True)
    in_app_notifications = Column(Boolean, default=True)
    email_notifications = Column(Boolean, default=False)
