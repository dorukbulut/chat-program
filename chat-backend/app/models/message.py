from sqlalchemy import Column , String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from sqlalchemy.orm import relationship

class Message(Base):
    __tablename__ = "message"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_id =  Column(String)
    receiver_id = Column(String)
    content = Column(String)
    message_time = Column(DateTime)