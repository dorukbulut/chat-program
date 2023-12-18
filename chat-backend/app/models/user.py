from sqlalchemy import Column , String
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    password = Column(String)

    blacklists = relationship('Blacklist', back_populates='user')



    
