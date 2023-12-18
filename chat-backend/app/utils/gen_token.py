from datetime import datetime, timedelta
from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from app.utils.apiVersion import *
from app.schemas.user import UserLogin, Token 
import os
from fastapi import Depends, HTTPException
import uuid
from jose import jwt, JWTError
from typing import Annotated
from app.models.token import Blacklist

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrpyt_context = CryptContext(schemes=["bcrypt"], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl=f"{VERSION_1}/user/login")

def create_access_token(db, username: str, user_id : str,  expires_: timedelta):
    
    encode = {"sub" : username, "id": user_id}
    expires = datetime.utcnow() + expires_
    encode.update({"exp" : expires})
    token = jwt.encode(encode, SECRET_KEY, ALGORITHM)
    token_entry = Blacklist(revoked=False,
                                 token=token,
                                 user_id= user_id,
                                revokedAt=expires)
    db.add(token_entry)
    db.commit()
    db.refresh(token_entry)
    db.close()
    return token


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username = payload.get('sub')
        user_id = payload.get("id")
        if username is None or user_id is None:
            return None
        return payload
    except JWTError:
        return None

