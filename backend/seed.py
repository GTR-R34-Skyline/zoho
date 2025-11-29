from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Member, Task, LearningPath, Settings
from auth import get_password_hash
from datetime import datetime, timedelta
import random

def seed_data():
    # Ensure tables exist (Alembic should handle this, but for safety in dev)
    # Base.metadata.create_all(bind=engine) 
    
    db = SessionLocal()
    try:
        if db.query(Member).count() > 5:
            print("Database already seeded with sufficient data.")
            return

        print("Seeding database...")
        
        # Settings
        if not db.query(Settings).first():
            db.add(Settings())

        # Members (10+)
        roles = ["Developer", "Designer", "Manager", "Data Scientist", "DevOps"]
        members = []
        for i in range(1, 13):
            name = f"User {i}"
            email = f"user{i}@example.com"
            role = random.choice(roles)
            members.append(Member(
                name=name,
                email=email,
                role=role,
                participation_score=random.randint(50, 100),
                learning_path_status=random.choice(["Not Started", "In Progress", "Completed"]),
                initials=f"U{i}",
                password_hash=get_password_hash("password"),
                primary_skill=random.choice(["React", "Python", "Design"]),
                skills=[{"name": "Skill A", "proficiency": "Intermediate"}]
            ))
        
        db.add_all(members)
        db.commit()
        
        for m in members:
            db.refresh(m)

        # Paths (5+)
        paths_data = [
            ("Full Stack Mastery", "Master frontend and backend."),
            ("Data Science Fundamentals", "Basics of data analysis."),
            ("UI/UX Design", "Design principles."),
            ("DevOps Pipeline", "CI/CD and Cloud."),
            ("Mobile Development", "React Native and Swift."),
            ("Cybersecurity Basics", "Network security.")
        ]
        
        paths = []
        for name, desc in paths_data:
            paths.append(LearningPath(
                name=name,
                description=desc,
                difficulty=random.choice(["Beginner", "Intermediate", "Advanced"]),
                skill_tags=["General"],
                estimated_duration=f"{random.randint(10, 50)} hours",
                completion_rate=random.randint(20, 90),
                modules=[{"title": "Module 1", "status": "Not Started"}]
            ))
            
        db.add_all(paths)
        db.commit()
        
        for p in paths:
            db.refresh(p)

        # Tasks (15+)
        tasks = []
        for i in range(1, 21):
            tasks.append(Task(
                title=f"Task {i}",
                status=random.choice(["Pending", "In Progress", "Completed"]),
                assigned_to=random.choice(members).id,
                priority=random.choice(["Low", "Medium", "High"]),
                due_date=datetime.utcnow() + timedelta(days=random.randint(1, 10)),
                skill_focus="General",
                path_id=random.choice(paths).id
            ))
            
        db.add_all(tasks)
        db.commit()
        
        print("Database seeded successfully.")
        
    except Exception as e:
        print(f"Seeding failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
