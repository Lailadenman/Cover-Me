from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Message, db
from app.forms import NewMessageForm

message_routes = Blueprint('message', __name__)

@message_routes.route('/<int:uId>', methods=["POST"])
def createMessage(uId):
    form = NewMessageForm()
    mess = Message(user_id=uId, group_id=form.group_id.data, room_id=form.room_id.data, message=form.message.data)

    db.session.add(mess)
    db.session.commit()

    print("@@@@@@@@@@@@@@@@@@@", mess.to_dict())

    return mess.to_dict()

# @group_request_routes.route('/<int:id>', methods=["DELETE"])
# def deleteGroupRequest(id):
#     groupReq = Group_Request.query.get(id)

#     groupDet = groupReq.to_dict()

#     db.session.delete(groupReq)

#     db.session.commit()

#     return groupDet
