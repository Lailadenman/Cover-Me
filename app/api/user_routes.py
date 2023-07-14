from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Group_Member, Group

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/groups')
def getGroups(id):
    groups = []

    groupRel_query = Group_Member.query.filter(Group_Member.user_id == id)

    groupRel = groupRel_query.all()

    for rel in groupRel:
        group = Group.query.get(rel.group_id)

        # print(group.to_dict())
        groups.append(group.to_dict())

    print("##################", groups)

    return groups

# @user_routes.route('/<int:id>/addPic')
# def add_pro_pic(id):
