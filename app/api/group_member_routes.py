from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group_Member, Group_Request, db
from app.forms import GroupRequestForm

group_member_routes = Blueprint('group_members', __name__)

@group_member_routes.route('/<int:id>', methods=["POST"])
def createGroupMember(id):
    form = GroupRequestForm

    # print("~~~~~~~~~~~~~~~~~~~~rID: ", form.id.data)
    req = Group_Request.query.get(id)

    newMem = Group_Member(user_id=req.user_id, group_id=req.group_id)

    db.session.delete(req)

    db.session.add(newMem)
    db.session.commit()

    print("~~~~~~~~~~~~~~~~~~", newMem.to_dict())

    return newMem.to_dict()

@group_member_routes.route('/<int:id>', methods=["DELETE"])
def deleteGroupMember(id):
    groupMem = Group_Member.query.get(id)

    groupDet = groupMem.to_dict()

    db.session.delete(groupMem)

    db.session.commit()

    return groupDet
