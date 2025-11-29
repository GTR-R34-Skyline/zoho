from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict
from datetime import datetime

# --- Shared ---
class Skill(BaseModel):
    name: str
    proficiency: str = "Beginner"

# --- Members ---
class MemberBase(BaseModel):
    name: str
    role: str
    email: str
    avatar: Optional[str] = None
    initials: str
    participation_score: int = 0
    learning_path_status: str = "Not Started"
    skills: List[Dict[str, Any]] = [] # List of Skill dicts
    interests: List[str] = []

class MemberCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "Developer"

class MemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None
    participation_score: Optional[int] = None
    learning_path_status: Optional[str] = None
    skills: Optional[List[Dict[str, Any]]] = None
    interests: Optional[List[str]] = None

class Member(MemberBase):
    id: int
    joined_at: datetime

    class Config:
        from_attributes = True

# --- Tasks ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "Pending"
    priority: str = "Medium"
    due_date: Optional[datetime] = None
    skill_focus: str = "General"
    assigned_to: Optional[int] = None
    path_id: Optional[int] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    skill_focus: Optional[str] = None
    assigned_to: Optional[int] = None
    path_id: Optional[int] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    logs: List[Dict[str, Any]] = []

    class Config:
        from_attributes = True

# --- Learning Paths ---
class LearningPathBase(BaseModel):
    name: str
    description: str
    difficulty: str
    skill_tags: List[str] = []
    estimated_duration: str
    completion_rate: int = 0
    modules: List[Dict[str, Any]] = []

class LearningPathCreate(LearningPathBase):
    pass

class LearningPath(LearningPathBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Settings ---
class SettingsBase(BaseModel):
    theme: str = "black-blue"
    accent_color: str = "#3B82F6"
    bot_enabled: bool = True
    in_app_notifications: bool = True
    email_notifications: bool = False

class Settings(SettingsBase):
    id: int

    class Config:
        from_attributes = True

# --- Auth ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- Analytics ---
class AnalyticsData(BaseModel):
    total_members: int
    active_tasks: int
    avg_completion: str
    engagement: str
    member_growth: List[Dict[str, Any]]
    skills_distribution: List[Dict[str, Any]]
    path_completion_stats: List[Dict[str, Any]]
    engagement_by_channel: List[Dict[str, Any]]
    insights_feed: List[Dict[str, Any]]
