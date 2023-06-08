from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group_Request, db
from app.forms import GroupRequestForm

group_request_routes = Blueprint('group_request', __name__)

@group_request_routes.route('/<int:uId>/<int:gId>', methods=["POST"])
def createGroupRequest(uId, gId):
    request = Group_Request(user_id=uId, group_id=gId)

    db.session.add(request)
    db.session.commit()

    print("@@@@@@@@@@@@@@@@@@@", request.to_dict())

    return request.to_dict()

@group_request_routes.route('/<int:id>', methods=["DELETE"])
def deleteGroupRequest(id):
    groupReq = Group_Request.query.get(id)

    groupDet = groupReq.to_dict()

    db.session.delete(groupReq)

    db.session.commit()

    return groupDet
