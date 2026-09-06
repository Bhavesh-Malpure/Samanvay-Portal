from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.problem import Problem
from app.models.user import User


router = APIRouter(
    prefix="/api/government",
    tags=["Government - Stats"],
)


# ============================================================
# GOVERNMENT ROLE CHECK
# ============================================================

def require_government(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "GOVERNMENT":
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Government access required",
        )

    return current_user


# ============================================================
# GET GOVERNMENT DASHBOARD STATS
# ============================================================

@router.get("/stats")
def get_government_stats(
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    total_problems = (
        db.query(Problem)
        .count()
    )

    pending_problems = (
        db.query(Problem)
        .filter(
            Problem.status.in_(
                ["SUBMITTED", "UNDER_REVIEW"]
            )
        )
        .count()
    )

    validated_problems = (
        db.query(Problem)
        .filter(
            Problem.status == "VALIDATED"
        )
        .count()
    )

    rejected_problems = (
        db.query(Problem)
        .filter(
            Problem.status == "REJECTED"
        )
        .count()
    )

    return {
        "total": total_problems,
        "pending": pending_problems,
        "validated": validated_problems,
        "rejected": rejected_problems,
    }