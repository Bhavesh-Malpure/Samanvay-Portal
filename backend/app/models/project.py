from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    problem_id = Column(Integer, nullable=True, index=True)
    university_id = Column(Integer, nullable=True, index=True)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)

    # Project-level status.
    # This is intentionally kept as a String because
    # project status values are not yet frozen in the shared contract.
    status = Column(
        String(50),
        nullable=False,
        default="IN_PROGRESS",
        index=True,
    )

    # Percentage: 0 to 100
    progress = Column(Integer, nullable=False, default=0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )