from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import ChatRoom, db

room_routes = Blueprint('room', __name__)

@room_routes.route('/<int:uId>/<int:rId>', methods=["POST"])
def createRoom(uId, rId):
    # form = NewMessageForm()
    room = ChatRoom(user_id=uId, receiver_id=rId)

    db.session.add(room)
    db.session.commit()

    print("@@@@@@@@@@@@@@@@@@@", room.to_dict())

    return room.to_dict()
