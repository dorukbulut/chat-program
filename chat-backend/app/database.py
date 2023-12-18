# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Create a Session class to handle database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Import your models here so that they are registered with SQLAlchemy
from app.models.user import User
from app.models.token import Blacklist
# Create tables in the database
def create_tables():
    try:
        # Test the database connection
        with engine.connect() as connection:
            print("PostgreSQL Database connection successful")

        # Drop All Tables (including those with relationships)
        Base.metadata.drop_all(bind=engine, checkfirst=False)
        # Create tables
        Base.metadata.create_all(bind=engine)
        logging.info("Tables created successfully")

    except Exception as e:
        logging.error(f"Error connecting to the database: {str(e)}")

