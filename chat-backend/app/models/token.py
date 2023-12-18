from sqlalchemy import Column , String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from sqlalchemy.orm import relationship


class Blacklist(Base):
    __tablename__ = "blacklist"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    revoked = Column(Boolean, default=False)
    revokedAt = Column(DateTime, nullable=True)
    token = Column(String, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), default=uuid.uuid4)
    user = relationship('User', back_populates='blacklists')
    
