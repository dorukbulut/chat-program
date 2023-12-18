from fastapi import FastAPI, WebSocket
from app.api.user import router as UserRouter
from app.api.chat import router as ChatRouter
from dotenv import load_dotenv
from app.utils import get_db
from app.database import create_tables
from app.utils.apiVersion import *
from fastapi.middleware.cors import CORSMiddleware

create_tables()
app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#routes
app.include_router(UserRouter, prefix=f"{VERSION_1}/user")
app.include_router(ChatRouter, prefix=f"{VERSION_1}/chat")

