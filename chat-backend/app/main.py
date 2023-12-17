from fastapi import FastAPI
from app.api.user import router as UserRouter

from dotenv import load_dotenv
from app.utils import get_db
from app.database import create_tables
from app.utils.apiVersion import *

create_tables()
app = FastAPI()

#routes
app.include_router(UserRouter, prefix=f"{VERSION_1}/user")
