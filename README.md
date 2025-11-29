# ZohoLMS - Intelligent Learning Management System

A premium, AI-powered LMS dashboard built for the Zoho ecosystem.

## Features
- **Frontend**: React + Vite + Tailwind CSS (Premium Design System).
- **Backend**: FastAPI + SQLite.
- **ML**: Scikit-learn for skill clustering and recommendations.
- **Bot**: Zoho Cliq integration scaffold.

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic scikit-learn numpy

# Run server
uvicorn backend.main:app --reload
```

## API Endpoints
- `GET /api/members`: List all members.
- `GET /api/tasks`: List all tasks.
- `POST /api/bot/command`: Handle Cliq slash commands.

## Cliq Integration
Configure your Zoho Cliq bot to send POST requests to `https://your-domain.com/api/bot/command`.
Supported commands: `/addSkill`, `/logTask`, `/recommendNext`.
