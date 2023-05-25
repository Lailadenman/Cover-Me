from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group_Member

group_member_routes = Blueprint('group_members', __name__)

@group_member_routes.route('/:id')
def get_group_members(id):
    members = []

    memberRel_query = Group_Member.query.filter(Group_Member.group_id == id)

    memberRel = memberRel_query.all()

    for rel in memberRel:
        members.append(rel.to_dict())

    return members
