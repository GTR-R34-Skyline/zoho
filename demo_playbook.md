# Demo Playbook

## 1. Landing Page & First Impressions
- **Start**: Open `http://localhost:5173/`.
- **Highlight**: Premium gradient hero section, "Begin Your Journey" CTA, and trusted badges.
- **Action**: Click "Begin Your Journey" to enter the Dashboard.

## 2. Dashboard & Demo Mode
- **View**: Show the 5 key metrics and the charts.
- **Action**: Toggle "Demo Mode" in the top right.
- **Observe**: Watch metrics jump (e.g., Active Members increases, charts update) to simulate live activity.

## 3. Member Management
- **Nav**: Go to "Members".
- **Action**: Use the search bar to find "Sarah".
- **Action**: Click "Add Member", type "John Doe", and see him appear in the list (client-side).
- **Detail**: Click on "Sarah Chen". Show her profile, skills, and the "Recommended Next Steps" card.

## 4. Tasks & Paths
- **Nav**: Go to "Tasks & Paths".
- **Action**: Switch between "Tasks" list and "Learning Paths" grid.
- **Action**: Click "Create Task", assign it to a member.
- **Path Detail**: Click on "Full Stack Mastery" to see modules and enrolled members.

## 5. Insights & Analytics
- **Nav**: Go to "Insights".
- **Highlight**: The "Engagement by Channel" table and "Automated Insights Feed".

## 6. Bot Integration (Backend Demo)
- **Tool**: Use Postman or curl.
- **Endpoint**: `POST http://127.0.0.1:8000/api/bot/command`
- **Payload**:
  ```json
  {
    "command": "/recommendNext",
    "memberId": "m1"
  }
  ```
- **Response**: Verify JSON response with buttons.

## Inspiration
Inspired by modern SaaS dashboards like Linear and Framer templates.
