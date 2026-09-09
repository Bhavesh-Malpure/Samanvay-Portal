
from datetime import datetime

from pydantic import BaseModel


class ProblemCreate(BaseModel):
    title: str
    description: str
    category: str | None = None
    location: str | None = None
    district: str | None = None


class ProblemResponse(BaseModel):
    id: int
    citizen_id: int

    title: str
    description: str

    category: str | None
    location: str | None
    district: str | None

    # Uploaded problem images
    images: list[str] | None = None

    status: str
    priority: str | None

    ai_category: str | None
    ai_summary: str | None

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True