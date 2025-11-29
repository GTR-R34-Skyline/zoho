import sqlite3
import asyncio
from backend.database import connect_to_mongo, get_database, close_mongo_connection
from backend.auth import get_password_hash
from backend.models import Member, Task, LearningPath
from bson import ObjectId

# Map old IDs to new ObjectIds
id_map = {}

async def migrate():
    print("Starting migration...")
    
    # 1. Connect to MongoDB
    await connect_to_mongo()
    db = get_database()
    if db is None:
        from backend.database import db as global_db
        db = global_db.db
        
    # Clear existing data? Let's keep it additive or upsert based on email
    # For this request, user wants OLD data, so let's prioritize that.
    
    # 2. Connect to SQLite
    conn = sqlite3.connect('backend/app.db')
    cursor = conn.cursor()
    
    # --- Migrate Members ---
    print("\nMigrating Members...")
    cursor.execute("SELECT id, name, role, participation_score, learning_path_status FROM members")
    sqlite_members = cursor.fetchall()
    
    for row in sqlite_members:
        old_id, name, role, score, status = row
        
        # Generate missing fields
        email = f"{name.lower().replace(' ', '.')}@example.com"
        initials = "".join([n[0] for n in name.split()]).upper()[:2]
        password_hash = get_password_hash("password") # Default password
        
        # Check if exists
        existing = await db.members.find_one({"email": email})
        if existing:
            print(f"Skipping {name} (already exists)")
            id_map[old_id] = existing["_id"]
            continue
            
        new_member = Member(
            name=name,
            role=role,
            email=email,
            password_hash=password_hash,
            initials=initials,
            participation_score=score,
            learning_path_status=status
        )
        
        result = await db.members.insert_one(new_member.model_dump(by_alias=True, exclude={"id"}))
        id_map[old_id] = result.inserted_id
        print(f"Migrated {name} -> {email}")

    # --- Migrate Paths ---
    print("\nMigrating Learning Paths...")
    cursor.execute("SELECT id, name, description, difficulty FROM learning_paths")
    sqlite_paths = cursor.fetchall()
    
    for row in sqlite_paths:
        old_id, name, desc, diff = row
        
        # Check if exists (by name)
        existing = await db.paths.find_one({"name": name})
        if existing:
             print(f"Skipping {name} (already exists)")
             continue

        new_path = LearningPath(
            name=name,
            description=desc,
            difficulty=diff,
            skill_tags=["General"], # Default
            modules=[]
        )
        await db.paths.insert_one(new_path.model_dump(by_alias=True, exclude={"id"}))
        print(f"Migrated Path: {name}")

    # --- Migrate Tasks ---
    print("\nMigrating Tasks...")
    cursor.execute("SELECT id, title, status, assigned_to FROM tasks")
    sqlite_tasks = cursor.fetchall()
    
    for row in sqlite_tasks:
        old_id, title, status, assigned_to_old = row
        
        # Map assigned_to
        assigned_to_new = id_map.get(assigned_to_old)
        
        new_task = Task(
            title=title,
            status=status,
            assigned_to=str(assigned_to_new) if assigned_to_new else None
        )
        
        await db.tasks.insert_one(new_task.model_dump(by_alias=True, exclude={"id"}))
        print(f"Migrated Task: {title}")

    conn.close()
    await close_mongo_connection()
    print("\nMigration Complete!")

if __name__ == "__main__":
    asyncio.run(migrate())
