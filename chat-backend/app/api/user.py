from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from app.utils.get_db import get_db
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse, Token, UserLogin, UserDeleteRequest
from app.services.user import * 
from app.utils.gen_token import *
from typing import Annotated

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(check_user_auth)]
router = APIRouter()



@router.get("/chat-history/{username}/{who}")
async def get_history(username : str, who: str, user_dep: user_dependency, db: db_dependency):
    try:
        messages = get_chat_history(db, username, who)
        return messages
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    

@router.post("/login", response_model=Token)
async def login(form_data : UserLogin, db: db_dependency, background_tasks: BackgroundTasks):
    try:
        token = login_for_access_token(form_data, db)
        background_tasks.add_task(delete_entry, db, token.get("access_token"))
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


@router.get("/get/{username}")
async def get_user(username : str, user_dep: user_dependency, db: db_dependency):
    try:
        user = find_user(db, username)
        userResp = UserResponse(
            username=user.username,
            name=user.name,
            surname=user.surname
        )
        friendList = get_user_list(db, username)
        return {"userResp" : userResp, "friendList" : friendList}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))


@router.post("/revoke")
async def get_user(user : UserDeleteRequest, user_dep: user_dependency, db: db_dependency):
    try:
        revoke_token(user, db)
        return None
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))  