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

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrpyt_context = CryptContext(schemes=["bcrypt"], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl=f"{VERSION_1}/user/login")

def create_access_token(username: str, user_id : str,  expires_: timedelta):
    encode = {"sub" : username, "id": user_id}
    expires = datetime.utcnow() + expires_
    encode.update({"exp" : expires})
    return jwt.encode(encode, SECRET_KEY, ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username = payload.get('sub')

        user_id = payload.get("id")
        if username is None or user_id is None:
            raise HTTPException(status_code=401, detail="Not logged in !")
        return {"username": username}
    except JWTError:
        raise HTTPException(status_code=401, detail="Not logged in !")

