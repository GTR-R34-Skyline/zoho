# Zoho LMS Backend

FastAPI backend with SQLAlchemy (SQLite) and Alembic migrations.

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   (Ensure `fastapi`, `uvicorn`, `sqlalchemy`, `alembic`, `pydantic`, `python-jose`, `passlib`, `bcrypt` are installed)

2. **Initialize Database**:
   The app automatically creates tables on startup if they don't exist.
   To run migrations manually:
   ```bash
   alembic upgrade head
   ```

3. **Seed Data**:
   ```bash
   python -m backend.seed
   ```

4. **Run Server**:
   ```bash
   uvicorn backend.main:app --reload
   ```

## API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing
Run unit tests:
```bash
python -m pytest
```

Run integration checks:
```bash
python scripts/check_api.py
```
