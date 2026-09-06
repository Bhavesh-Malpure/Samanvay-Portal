from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.problem import Problem
from app.models.problem_status_history import ProblemStatusHistory
from app.models.user import User
from app.schemas.problem import ProblemResponse


router = APIRouter(
    prefix="/api/government/problems",
    tags=["Government - Problems"],
)


# =========================================================
# GOVERNMENT ACCESS CHECK
# =========================================================

def require_government(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "GOVERNMENT":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Government access required",
        )

    return current_user


# =========================================================
# GET ALL PROBLEMS
# =========================================================

@router.get(
    "/all",
    response_model=list[ProblemResponse],
)
def get_all_government_problems(
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problems = (
        db.query(Problem)
        .order_by(Problem.created_at.desc())
        .all()
    )

    return problems


# =========================================================
# GET PENDING PROBLEMS
# SUBMITTED + UNDER_REVIEW
# =========================================================

@router.get(
    "/pending",
    response_model=list[ProblemResponse],
)
def get_pending_problems(
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problems = (
        db.query(Problem)
        .filter(
            Problem.status.in_(
                ["SUBMITTED", "UNDER_REVIEW"]
            )
        )
        .order_by(Problem.created_at.asc())
        .all()
    )

    return problems


# =========================================================
# GET SINGLE PROBLEM
# =========================================================

@router.get(
    "/{problem_id}",
    response_model=ProblemResponse,
)
def get_government_problem(
    problem_id: int,
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problem = (
        db.query(Problem)
        .filter(Problem.id == problem_id)
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    return problem


# =========================================================
# REVIEW PROBLEM
# SUBMITTED -> UNDER_REVIEW
# =========================================================

@router.post(
    "/{problem_id}/review",
    response_model=ProblemResponse,
)
def review_problem(
    problem_id: int,
    comment: str | None = None,
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problem = (
        db.query(Problem)
        .filter(Problem.id == problem_id)
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    if problem.status != "SUBMITTED":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Problem cannot be reviewed because "
                f"its current status is {problem.status}."
            ),
        )

    old_status = problem.status
    new_status = "UNDER_REVIEW"

    problem.status = new_status

    history = ProblemStatusHistory(
        problem_id=problem.id,
        changed_by=current_user.id,
        old_status=old_status,
        new_status=new_status,
        comment=comment,
    )

    db.add(history)

    db.commit()
    db.refresh(problem)

    return problem


# =========================================================
# VALIDATE PROBLEM
# UNDER_REVIEW -> VALIDATED
# =========================================================

@router.post(
    "/{problem_id}/validate",
    response_model=ProblemResponse,
)
def validate_problem(
    problem_id: int,
    comment: str | None = None,
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problem = (
        db.query(Problem)
        .filter(Problem.id == problem_id)
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    if problem.status != "UNDER_REVIEW":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Problem cannot be validated because "
                f"its current status is {problem.status}."
            ),
        )

    old_status = problem.status
    new_status = "VALIDATED"

    problem.status = new_status

    history = ProblemStatusHistory(
        problem_id=problem.id,
        changed_by=current_user.id,
        old_status=old_status,
        new_status=new_status,
        comment=comment,
    )

    db.add(history)

    db.commit()
    db.refresh(problem)

    return problem


# =========================================================
# REJECT PROBLEM
# UNDER_REVIEW -> REJECTED
# =========================================================

@router.post(
    "/{problem_id}/reject",
    response_model=ProblemResponse,
)
def reject_problem(
    problem_id: int,
    comment: str | None = None,
    current_user: User = Depends(require_government),
    db: Session = Depends(get_db),
):
    problem = (
        db.query(Problem)
        .filter(Problem.id == problem_id)
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    if problem.status != "UNDER_REVIEW":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Problem cannot be rejected because "
                f"its current status is {problem.status}."
            ),
        )

    old_status = problem.status
    new_status = "REJECTED"

    problem.status = new_status

    history = ProblemStatusHistory(
        problem_id=problem.id,
        changed_by=current_user.id,
        old_status=old_status,
        new_status=new_status,
        comment=comment,
    )

    db.add(history)

    db.commit()
    db.refresh(problem)

    return problem