import asyncio
from backend.database import get_database, connect_to_mongo, close_mongo_connection

async def check_data():
    # Fix: get_database is synchronous
    db = get_database()
    
    if db is None:
        from backend.database import db as global_db
        db = global_db.db
    
    print(f"MongoDB Object: {db}")
    
    if db is not None:
        # Try explicit collection access
        collection = db['members']
        cursor = collection.find()
        members = await cursor.to_list(length=1000)
        print(f"MongoDB Members: {len(members)}")
        for m in members:
            print(f"- {m.get('name')} ({m.get('email')}) - Has Password: {'password_hash' in m}")
            
        tasks = await db.tasks.find().to_list(length=1000)
        print(f"MongoDB Tasks: {len(tasks)}")
    
    await close_mongo_connection()

    # Check SQLite
    import sqlite3
    import os
    if os.path.exists("backend/app.db"):
        print("\nFound old SQLite DB (backend/app.db). Checking contents...")
        try:
            conn = sqlite3.connect("backend/app.db")
            cursor = conn.cursor()
            cursor.execute("SELECT name, email FROM members")
            rows = cursor.fetchall()
            print(f"SQLite Members: {len(rows)}")
            for r in rows:
                print(f"- {r[0]} ({r[1]})")
            conn.close()
        except Exception as e:
            print(f"Could not read SQLite DB: {e}")
    else:
        print("\nNo old SQLite DB found.")

if __name__ == "__main__":
    asyncio.run(check_data())
