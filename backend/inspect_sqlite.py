import sqlite3

def inspect():
    try:
        conn = sqlite3.connect('backend/app.db')
        cursor = conn.cursor()
        
        # Get tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        for table in tables:
            table_name = table[0]
            print(f"\n--- Table: {table_name} ---")
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            for col in columns:
                print(f"  {col[1]} ({col[2]})")
                
            # Get sample data
            cursor.execute(f"SELECT * FROM {table_name} LIMIT 1")
            row = cursor.fetchone()
            if row:
                print(f"  Sample: {row}")
                
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect()
