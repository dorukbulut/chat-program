from pydantic import BaseModel

class Token(BaseModel):
    access_token : str
    token_type : str

class UserCreate(BaseModel):
    username: str
    name: str
    surname : str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str



class UserResponse(BaseModel):
    username: str
    name: str
    surname: str

