from fastapi import  WebSocket, APIRouter
from typing import Dict
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.websockets import WebSocketDisconnect
import json
from confluent_kafka import Producer


# Create the KafkaProducer
producer = Producer({
    'bootstrap.servers': 'kafka:9092',
})


router = APIRouter()

# Data structure to store active WebSocket connections
connections: Dict[str, WebSocket] = {}

# WebSocket endpoint
@router.websocket("/private/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()

    # Add the WebSocket connection to the dictionary
    connections[user_id] = websocket

    try:
        while True:
            data = await websocket.receive_text()

            try:
                # Attempt to parse the JSON-formatted string into a Python dictionary
                data_dict = json.loads(data)

                # Extract receiver user ID and message from the data_dict
                receiver_user_id = data_dict.get("receiver_user_id", "")
                message = data_dict.get("message", "")
                time  = data_dict.get("time", "")

                # Send message to kafka
                data = {
                    "sender_id" : user_id,
                    "receiver_id" : receiver_user_id,
                    "message_time" : time,
                    "content" : message
                }
                
                producer.produce('chat_message', value=json.dumps(data))

                # Send the message to the specific receiver if they are connected
                if receiver_user_id in connections:
                    receiver_websocket = connections[receiver_user_id]
                    resp = {
                        "message" : message,
                        "time":time,
                    }
                    await receiver_websocket.send_text(json.dumps(resp))

            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")

    except WebSocketDisconnect:
        # Remove the WebSocket connection from the dictionary when disconnected
        del connections[user_id]