from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectCreate(BaseModel):
    problem_id: int | None = None
    university_id: int | None = None

    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = None

    status: str = Field(
        default="IN_PROGRESS",
        max_length=50,
    )

    progress: int = Field(
        default=0,
        ge=0,
        le=100,
    )


class ProjectResponse(BaseModel):
    id: int

    problem_id: int | None = None
    university_id: int | None = None

    title: str
    description: str | None = None

    status: str
    progress: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)