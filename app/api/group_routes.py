from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group, db
from app.forms import NewGroupForm

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def getGroups():
    groups = []

    groupList = Group.query.all()

    for group in groupList:
        groups.append(group.to_dict())

    return groups

@group_routes.route("/:id")
def getGroupById(id):
    groupQuery = Group.query.filter(Group.id == id)
    group = groupQuery.one()

    return group.to_dict()

@group_routes.route("/", methods=["POST"])
def createGroup():
    form = NewGroupForm()

    newGroup = Group(name=form.name.data, description=form.description.data, owner_id=form.owner_id.data)

    db.session.add(newGroup)
    db.session.commit()
