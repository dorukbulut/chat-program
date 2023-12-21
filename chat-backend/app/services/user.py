from sqlalchemy.orm import Session
from sqlalchemy import not_, and_, or_
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.models.message import Message
from app.models.token import Blacklist
from app.schemas.user import UserCreate, UserLogin, Token, UserLogin, UserDeleteRequest
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.gen_token import *
from typing import Annotated
from app.utils.get_db import get_db
import time

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



def revoke_token(user: UserDeleteRequest , db):
    token =  db.query(Blacklist).filter(Blacklist.token == user.token).first()
    if token is None:
        raise ValueError("Invalid Token !")
    token.revoked = True
    
    db.commit()
def check_user_auth(token: Annotated[str, Depends(oauth2_bearer)], db: Annotated[Session, Depends(get_db)]):
    user = get_current_user(token)
    if user is not None:
        if db.query(Blacklist).filter(Blacklist.revoked == True, Blacklist.user_id == user.get('id'), Blacklist.token == token).first():
            raise HTTPException(status_code=401, detail="Invalid Token!")
        else:
            return user.get('sub')
    else:
        raise HTTPException(status_code=401, detail="Invalid Token!")

def delete_entry(db, token):
    time.sleep(3700)
    db.query(Blacklist).filter(Blacklist.token == token).delete()
    db.commit()


def login_for_access_token(form_data : UserLogin, db):
    user = auth_user(form_data.username, form_data.password, db)
    if not user:
        raise ValueError("Invalid credentials")
    
    token = create_access_token(db, user.username, str(user.id), timedelta(minutes=60))
    return {"access_token" : token, "token_type" : "bearer", "username": form_data.username}



def get_user_list(db, username:str):
    users = db.query(User.name, User.surname, User.username).filter(not_(User.username == username)).all()
    if not users:
        return []
    return users



def get_chat_history(db, username:str, who:str ):
    messages = db.query(Message.content, Message.message_time, Message.sender_id, Message.receiver_id) \
                .filter(or_(
                    and_(Message.sender_id == username, Message.receiver_id == who),
                    and_(Message.sender_id == who, Message.receiver_id == username)
                )).order_by(Message.message_time).all()
    if not messages:
        return []
    return messages


