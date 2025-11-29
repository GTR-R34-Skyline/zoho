from backend.models import Member, Task, LearningPath
from backend.auth import create_access_token

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_create_member(client):
    response = client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "test@example.com", "password": "password", "role": "Developer"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_login(client):
    # Register first
    client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "test@example.com", "password": "password", "role": "Developer"}
    )
    
    # Login
    response = client.post(
        "/api/auth/login",
        data={"username": "test@example.com", "password": "password"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_get_members(client):
    client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "test@example.com", "password": "password", "role": "Developer"}
    )
    response = client.get("/api/members")
    assert response.status_code == 200
    assert len(response.json()) == 1

def test_create_task(client):
    response = client.post(
        "/api/tasks",
        json={"title": "New Task", "status": "Pending", "priority": "High"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Task"
    assert data["status"] == "Pending"

def test_assign_task(client):
    # Create member
    m_resp = client.post(
        "/api/auth/register",
        json={"name": "Test User", "email": "test@example.com", "password": "password", "role": "Developer"}
    )
    member_id = m_resp.json()["id"]
    
    # Create task
    t_resp = client.post(
        "/api/tasks",
        json={"title": "Task to Assign", "status": "Pending"}
    )
    task_id = t_resp.json()["id"]
    
    # Assign
    response = client.put(
        f"/api/tasks/{task_id}",
        json={"assigned_to": member_id, "status": "In Progress"}
    )
    assert response.status_code == 200
    
    # Verify
    tasks = client.get("/api/tasks").json()
    task = next(t for t in tasks if t["id"] == task_id)
    assert task["assigned_to"] == member_id
    assert task["status"] == "In Progress"

def test_create_path(client):
    response = client.post(
        "/api/paths",
        json={
            "name": "Python Path", 
            "description": "Learn Python", 
            "difficulty": "Beginner",
            "estimated_duration": "10h",
            "skill_tags": ["Python"]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Python Path"
    assert "Python" in data["skill_tags"]

def test_analytics(client):
    response = client.get("/api/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "total_members" in data
def test_delete_member(client):
    # Create
    resp = client.post(
        "/api/auth/register",
        json={"name": "To Delete", "email": "delete@example.com", "password": "password", "role": "Developer"}
    )
    member_id = resp.json()["id"]
    
    # Delete
    del_resp = client.delete(f"/api/members/{member_id}")
    assert del_resp.status_code == 200
    
    # Verify
    get_resp = client.get(f"/api/members/{member_id}")
    assert get_resp.status_code == 404

def test_bot_command(client):
    # Create member for context
    resp = client.post(
        "/api/auth/register",
        json={"name": "Bot User", "email": "bot@example.com", "password": "password", "role": "Developer"}
    )
    member_id = resp.json()["id"]

    # Test command
    response = client.post(
        "/api/bot/command",
        json={"command": "/recommendNext", "memberId": member_id}
    )
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list) # Should return recommendations list

def test_metrics(client):
    response = client.get("/metrics")
    assert response.status_code == 200
    assert "http_requests_total" in response.json()
