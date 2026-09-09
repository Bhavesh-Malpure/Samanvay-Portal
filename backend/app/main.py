import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.database import Base, engine
from app.models.user import User
from app.models.problem import Problem
from app.models.problem_status_history import ProblemStatusHistory
from app.models.password_reset_token import PasswordResetToken
from app.models.notification import Notification
from app.models.project import Project

from app.routes.auth import router as auth_router
from app.routes.problems import router as problems_router
from app.routes.government import router as government_router
from app.routes.government_stats import router as government_stats_router
from app.routes.notifications import router as notifications_router
from app.routes.users import router as users_router
from app.routes.projects import router as projects_router


# ============================================================
# CREATE UPLOAD DIRECTORY
# ============================================================

os.makedirs("uploads", exist_ok=True)


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Samanvay Portal API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Vite frontend
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        # Vite frontend - current port
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# STATIC FILES
# ============================================================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)


# ============================================================
# ROUTES
# ============================================================

app.include_router(auth_router)
app.include_router(problems_router)
app.include_router(government_router)
app.include_router(government_stats_router)
app.include_router(notifications_router)
app.include_router(users_router)
app.include_router(projects_router)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Samanvay Portal API is running"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }