import os
import uuid

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.problem import Problem
from app.models.problem_status_history import ProblemStatusHistory
from app.models.user import User
from app.schemas.problem import ProblemResponse
from app.models.notification import Notification


router = APIRouter(
    prefix="/api/problems",
    tags=["Problems"],
)


# ============================================================
# IMAGE UPLOAD SETTINGS
# ============================================================

MAX_IMAGES = 3
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

ALLOWED_CONTENT_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

UPLOAD_DIR = os.path.join("uploads", "problems")
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ============================================================
# CREATE PROBLEM
# ============================================================

@router.post(
    "",
    response_model=ProblemResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_problem(
    title: str = Form(...),
    description: str = Form(...),
    category: str | None = Form(None),
    location: str | None = Form(None),
    district: str | None = Form(None),
    images: list[UploadFile] | None = File(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # --------------------------------------------------------
    # Citizen permission
    # --------------------------------------------------------

    if current_user.role != "CITIZEN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only citizens can report problems",
        )

    # --------------------------------------------------------
    # Basic text validation
    # --------------------------------------------------------

    clean_title = title.strip()
    clean_description = description.strip()

    if not clean_title:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title cannot be empty.",
        )

    if not clean_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Description cannot be empty.",
        )

    if len(clean_title) > 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title cannot exceed 200 characters.",
        )

    # --------------------------------------------------------
    # Prepare images
    # --------------------------------------------------------

    uploaded_images = images or []

    if len(uploaded_images) > MAX_IMAGES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You can upload a maximum of {MAX_IMAGES} images.",
        )

    # --------------------------------------------------------
    # Validate ALL images BEFORE creating database record
    # --------------------------------------------------------

    validated_images = []

    for image in uploaded_images:

        if image.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Invalid image type for '{image.filename}'. "
                    "Only JPG, PNG and WEBP images are allowed."
                ),
            )

        file_data = await image.read()

        if len(file_data) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Image '{image.filename}' exceeds "
                    "the 5 MB size limit."
                ),
            )

        validated_images.append(
            {
                "data": file_data,
                "extension": ALLOWED_CONTENT_TYPES[image.content_type],
            }
        )

    # --------------------------------------------------------
    # Create problem
    # --------------------------------------------------------

    problem = Problem(
        citizen_id=current_user.id,
        title=clean_title,
        description=clean_description,
        category=category.strip() if category else None,
        location=location.strip() if location else None,
        district=(
            district.strip()
            if district
            else current_user.district
        ),
        images=[],
        status="SUBMITTED",
        priority=None,
        ai_category=None,
        ai_summary=None,
    )

    try:
        db.add(problem)
        db.flush()

        # ----------------------------------------------------
        # Create initial status history
        # ----------------------------------------------------

        history = ProblemStatusHistory(
            problem_id=problem.id,
            changed_by=current_user.id,
            old_status=None,
            new_status="SUBMITTED",
            comment="Problem submitted by citizen.",
        )

        db.add(history)

        # ----------------------------------------------------
        # Save images
        # ----------------------------------------------------

        saved_image_paths = []

        if validated_images:

            problem_upload_dir = os.path.join(
                UPLOAD_DIR,
                str(problem.id),
            )

            os.makedirs(
                problem_upload_dir,
                exist_ok=True,
            )

            for image_data in validated_images:

                filename = (
                    f"{uuid.uuid4().hex}"
                    f"{image_data['extension']}"
                )

                file_path = os.path.join(
                    problem_upload_dir,
                    filename,
                )

                with open(file_path, "wb") as file:
                    file.write(image_data["data"])

                relative_path = (
                    f"/uploads/problems/"
                    f"{problem.id}/{filename}"
                )

                saved_image_paths.append(relative_path)

        problem.images = saved_image_paths
                # ----------------------------------------------------
        # Create notification for citizen
        # ----------------------------------------------------

        notification = Notification(
            user_id=current_user.id,
            title="Problem Submitted",
            message=(
                f'Your problem "{problem.title}" has been '
                "successfully submitted."
            ),
            type="PROBLEM_UPDATE",
            is_read=False,
        )

        db.add(notification)





        # ----------------------------------------------------
        # Final database commit
        # ----------------------------------------------------

        db.commit()
        db.refresh(problem)

    except Exception:
        db.rollback()

        # Try to remove partially created upload folder
        if problem.id:
            problem_upload_dir = os.path.join(
                UPLOAD_DIR,
                str(problem.id),
            )

            if os.path.exists(problem_upload_dir):
                try:
                    for filename in os.listdir(problem_upload_dir):
                        file_path = os.path.join(
                            problem_upload_dir,
                            filename,
                        )

                        if os.path.isfile(file_path):
                            os.remove(file_path)

                    os.rmdir(problem_upload_dir)

                except Exception:
                    pass

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create problem.",
        )

    return problem


# ============================================================
# GET ALL PROBLEMS OF CURRENT CITIZEN
# ============================================================

@router.get(
    "",
    response_model=list[ProblemResponse],
)
def get_my_problems(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    citizen_id = int(current_user.id)

    problems = (
        db.query(Problem)
        .filter(
            Problem.citizen_id == citizen_id
        )
        .order_by(Problem.id.desc())
        .all()
    )

    return problems


# ============================================================
# GET SINGLE PROBLEM
# ============================================================

@router.get(
    "/{problem_id}",
    response_model=ProblemResponse,
)
def get_problem(
    problem_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    citizen_id = int(current_user.id)

    problem = (
        db.query(Problem)
        .filter(
            Problem.id == problem_id,
            Problem.citizen_id == citizen_id,
        )
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    return problem


# ============================================================
# GET PROBLEM STATUS HISTORY
# ============================================================

@router.get(
    "/{problem_id}/history",
)
def get_problem_history(
    problem_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # --------------------------------------------------------
    # Verify problem belongs to current citizen
    # --------------------------------------------------------

    problem = (
        db.query(Problem)
        .filter(
            Problem.id == problem_id,
            Problem.citizen_id == current_user.id,
        )
        .first()
    )

    if problem is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Problem not found",
        )

    # --------------------------------------------------------
    # Get status history
    # --------------------------------------------------------

    history = (
        db.query(ProblemStatusHistory)
        .filter(
            ProblemStatusHistory.problem_id == problem_id
        )
        .order_by(
            ProblemStatusHistory.created_at.asc()
        )
        .all()
    )

    return [
        {
            "id": item.id,
            "problem_id": item.problem_id,
            "changed_by": item.changed_by,
            "old_status": item.old_status,
            "new_status": item.new_status,
            "comment": item.comment,
            "created_at": item.created_at,
        }
        for item in history
    ]