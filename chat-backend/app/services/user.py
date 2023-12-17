from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, Token, UserLogin
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.gen_token import *
from typing import Annotated


def create_user(db: Session, new_user: UserCreate):
    # Check if the username already exists
    existing_user = get_user_by_username(db, new_user.username)
    if existing_user is not None:
        raise ValueError("Username already exists")

    try:
        # Create a new user
        db_user = User(
            username=new_user.username,
            name=new_user.name,
            surname=new_user.surname,
            password=bcrpyt_context.hash(new_user.password)
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError as e:
        db.rollback()
        raise ValueError("An error occurred while creating the user") from e

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def find_user(db : Session, username: str):
    existing_user = get_user_by_username(db, username)
    if existing_user is not None:
        return existing_user
    else:
        raise ValueError("Username not found")


def auth_user(username: str, password:str , db):
    existing_user = db.query(User).filter(User.username == username).first()
    if not existing_user:
        return False
    if not bcrpyt_context.verify(password, existing_user.password):
        return False
    return existing_user


def login_for_access_token(form_data : UserLogin, db):
    user = auth_user(form_data.username, form_data.password, db)
    if not user:
        raise ValueError("Invalid credentials")
    
    token = create_access_token(user.username, str(user.id), timedelta(minutes=45))

    return {"access_token" : token, "token_type" : "bearer"}




