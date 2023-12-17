from fastapi import APIRouter, Depends, HTTPException
from app.utils.get_db import get_db
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse, Token, UserLogin
from app.services.user import * 
from app.utils.gen_token import *
from typing import Annotated

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
router = APIRouter()

@router.post("/login", response_model=Token)
async def login(form_data : UserLogin, db: db_dependency):
    try:
        token = login_for_access_token(form_data, db)
        return token
    except ValueError as ve:
        raise HTTPException(status_code=401, detail=str(ve))
    

@router.post("/register", response_model=UserResponse)
async def register_user(newUser: UserCreate, db: db_dependency):
    try:
        user = create_user(db, newUser)
        userResp = UserResponse(
            username=user.username,
            name=user.name,
            surname=user.surname
        )
        return userResp
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@router.get("/get/{username}", response_model=UserResponse)
async def get_user(username : str, user_dep: user_dependency, db: db_dependency):
    try:
        user = find_user(db, username)
        userResp = UserResponse(
            username=user.username,
            name=user.name,
            surname=user.surname
        )
        return userResp
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve)) 