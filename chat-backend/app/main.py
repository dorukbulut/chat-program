from fastapi import FastAPI
from app.api.user import router as UserRouter
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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#routes
app.include_router(UserRouter, prefix=f"{VERSION_1}/user")
