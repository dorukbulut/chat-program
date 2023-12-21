from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import logging
import os
from dotenv import load_dotenv
from confluent_kafka import Consumer
import json
from sqlalchemy import Column , String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship
consumer = Consumer({'bootstrap.servers': 'kafka:9092', 'group.id' : 'database_consumer'})
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Create a Session class to handle database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

Base = declarative_base()

class Message(Base):
    __tablename__ = "message"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_id =  Column(String)
    receiver_id = Column(String)
    message_time = Column(DateTime)
    content  = Column(String)

running = True

def basic_consume_loop(consumer, topics):
    global running
    try:
        consumer.subscribe(topics)

        while running:
            msg = consumer.poll(timeout=1.0)
            if msg is None: continue

            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    # End of partition event
                    sys.stderr.write('%% %s [%d] reached end at offset %d\n' %
                                     (msg.topic(), msg.partition(), msg.offset()))
                elif msg.error():
                    raise KafkaException(msg.error())
            else:
                data = json.loads(msg.value())
                message = Message(**data)
                session.add(message)
                session.commit() 
    finally:
        # Close down consumer to commit final offsets.
        consumer.close()

def shutdown():
    running = False

if __name__ == "__main__":
    try:
        # Test the database connection
        with engine.connect() as connection:
            print("PostgreSQL Database connection successful")
            basic_consume_loop(consumer, ["chat_message"])
    except Exception as e:
        logging.error(f"Error connecting to the database: {str(e)}")
    