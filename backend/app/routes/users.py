from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


# ============================================================
# PROFILE SCHEMAS
# ============================================================

class ProfileResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None
    role: str
    district: str | None
    is_active: bool

    class Config:
        from_attributes = True


class ProfileUpdateRequest(BaseModel):
    name: str | None = None
    phone: str | None = None
    district: str | None = None


# ============================================================
# GET CURRENT USER PROFILE
# ============================================================

@router.get(
    "/profile",
    response_model=ProfileResponse,
)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


# ============================================================
# UPDATE CURRENT USER PROFILE
# ============================================================

@router.put(
    "/profile",
    response_model=ProfileResponse,
)
def update_profile(
    data: ProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if data.name is not None:
        name = data.name.strip()

        if not name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Name cannot be empty",
            )

        current_user.name = name

    if data.phone is not None:
        current_user.phone = data.phone.strip() or None

    if data.district is not None:
        current_user.district = data.district.strip() or None

    db.commit()
    db.refresh(current_user)

    return current_user