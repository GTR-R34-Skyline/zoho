import requests
import sys
import time

BASE_URL = "http://localhost:8000/api"

def log(msg):
    print(f"[TEST] {msg}")

def check(response, expected_status=200):
    if response.status_code != expected_status:
        print(f"FAILED: Expected {expected_status}, got {response.status_code}")
        print(f"Response: {response.text}")
        sys.exit(1)
    return response.json()

def main():
    log("Checking Health...")
    try:
        r = requests.get("http://localhost:8000/health")
        check(r)
    except Exception as e:
        print(f"Backend not running: {e}")
        sys.exit(1)

    log("Registering User...")
    email = f"test_{int(time.time())}@example.com"
    user_data = {
        "name": "Integration Test User",
        "email": email,
        "password": "password123",
        "role": "Developer"
    }
    r = requests.post(f"{BASE_URL}/auth/register", json=user_data)
    user = check(r)
    user_id = user["id"]
    log(f"User created: {user_id}")

    log("Logging In...")
    login_data = {"username": email, "password": "password123"}
    r = requests.post(f"{BASE_URL}/auth/login", data=login_data)
    token_data = check(r)
    token = token_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    log("Logged in successfully")

    log("Creating Task...")
    task_data = {
        "title": "Integration Task",
        "status": "Pending",
        "priority": "High"
    }
    r = requests.post(f"{BASE_URL}/tasks", json=task_data, headers=headers)
    task = check(r)
    task_id = task["id"]
    log(f"Task created: {task_id}")

    log("Assigning Task...")
    update_data = {"assigned_to": user_id, "status": "In Progress"}
    r = requests.put(f"{BASE_URL}/tasks/{task_id}", json=update_data, headers=headers)
    check(r)
    log("Task assigned")

    log("Verifying Task Assignment...")
    r = requests.get(f"{BASE_URL}/tasks", headers=headers)
    tasks = check(r)
    my_task = next((t for t in tasks if t["id"] == task_id), None)
    if not my_task or my_task["assigned_to"] != user_id:
        print("FAILED: Task assignment not reflected")
        sys.exit(1)
    log("Task assignment verified")

    log("Creating Learning Path...")
    path_data = {
        "name": "Integration Path",
        "description": "Test Path",
        "difficulty": "Beginner",
        "estimated_duration": "5h",
        "skill_tags": ["Test"]
    }
    r = requests.post(f"{BASE_URL}/paths", json=path_data, headers=headers)
    path = check(r)
    log(f"Path created: {path['name']}")

    log("Checking Analytics...")
    r = requests.get(f"{BASE_URL}/analytics", headers=headers)
    analytics = check(r)
    if analytics["total_members"] < 1:
        print("FAILED: Analytics total_members seems wrong")
        sys.exit(1)
    log("Analytics verified")

    print("\nALL CHECKS PASSED")

if __name__ == "__main__":
    main()
