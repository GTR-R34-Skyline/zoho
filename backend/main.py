from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints import router as api_router
from database import engine, Base

# Create tables on startup (simple dev mode)
Base.metadata.create_all(bind=engine)

import time
from fastapi import Request

# ... (imports)

app = FastAPI(title="Zoho LMS API")

# Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"{request.method} {request.url.path} - {response.status_code} - {process_time:.4f}s")
    return response

# ... (CORS)

@app.get("/metrics")
def get_metrics():
    # Stub for Prometheus
    return {
        "http_requests_total": 100, # Mock
        "http_request_duration_seconds": 0.5
    }

# CORS Configuration
origins = ["*"] # Allow all for demo/testing purposes

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Router
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Zoho LMS API is running with SQLAlchemy/SQLite"}

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "connected", "version": "1.0.0"}
