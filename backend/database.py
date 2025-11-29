from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Use SQLite by default, allow override
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend/app.db")

# check_same_thread=False is needed only for SQLite
connect_args = {"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
