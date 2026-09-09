from sqlalchemy import Column, DateTime, Integer, JSON, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)

    # Citizen who reported the problem
    citizen_id = Column(
        Integer,
        nullable=False,
        index=True,
    )

    # Basic problem information
    title = Column(
        String(200),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    category = Column(
        String(100),
        nullable=True,
    )

    location = Column(
        String(255),
        nullable=True,
    )

    district = Column(
        String(100),
        nullable=True,
        index=True,
    )

    # Uploaded problem images
    # Stores image file references/URLs as a JSON array.
    # Example:
    # ["uploads/problems/1/image1.jpg", "uploads/problems/1/image2.jpg"]
    images = Column(
        JSON,
        nullable=True,
        default=list,
    )

    # Workflow status
    status = Column(
        String(50),
        nullable=False,
        default="SUBMITTED",
        index=True,
    )

    # AI / priority fields
    priority = Column(
        String(50),
        nullable=True,
    )

    ai_category = Column(
        String(100),
        nullable=True,
    )

    ai_summary = Column(
        Text,
        nullable=True,
    )

    # Timestamps
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