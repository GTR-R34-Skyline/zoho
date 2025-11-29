def handle_bot_command(payload: dict):
    command = payload.get("command")
    
    if command == "/addSkill":
        return handle_add_skill(payload)
    elif command == "/logTask":
        return handle_log_task(payload)
    elif command == "/recommendNext":
        return handle_recommend_next(payload)
    elif command == "/assignTask":
        return handle_assign_task(payload)
    elif command == "/viewProfile":
        return handle_view_profile(payload)
    elif command == "/adminStats":
        return handle_admin_stats(payload)
    else:
        return {"text": "Unknown command. Try /addSkill, /logTask, or /recommendNext."}

def handle_add_skill(payload):
    skill = payload.get("skill")
    return {
        "text": f"Skill '{skill}' added successfully! 🎉",
        "card": {
            "title": "Skill Added",
            "theme": "modern-inline"
        }
    }

def handle_log_task(payload):
    task = payload.get("task")
    return {
        "text": f"Task '{task}' logged. Keep up the good work! ✅"
    }

def handle_recommend_next(payload):
    return {
        "text": "Based on your profile, here are your next steps:",
        "buttons": [
            {"label": "Start: Advanced React", "action": {"type": "open_url", "url": "http://localhost:5173/paths/p1"}},
            {"label": "View All Paths", "action": {"type": "open_url", "url": "http://localhost:5173/tasks"}}
        ]
    }

def handle_assign_task(payload):
    return {"text": "Task assigned successfully."}

def handle_view_profile(payload):
    return {
        "text": "Here is your profile summary:",
        "slides": [
            {
                "type": "images",
                "data": ["https://via.placeholder.com/150"]
            },
            {
                "type": "text",
                "data": "Sarah Chen - Senior Developer\nScore: 85"
            }
        ]
    }

def handle_admin_stats(payload):
    return {
        "text": "Admin Stats:\n- Active Members: 12\n- Tasks Pending: 5"
    }
