# from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_socketio import SocketIO, Namespace, emit, join_room, leave_room, send
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://coverme.onrender.com",
        "https://coverme.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

# Possibly just set an environment variable on here and in render to set the value of origins

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

@socketio.on("chat")
def on_chat(data):
    emit("chat", data, broadcast=True)

# class Room(Namespace):
#     __tablename__ = "rooms"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     def handle_message(self, json):
#         print('received json: ' + str(json))
#         # emit("chat", self, broadcast=True)

# socketio.on_namespace(Room('/test'))
