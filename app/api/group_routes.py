from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group, Event, db
from app.forms import NewGroupForm, EditGroupForm

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def getGroups():
    groups = []

    groupList = Group.query.all()

    for group in groupList:
        groups.append(group.to_dict())

    return groups

@group_routes.route("<int:id>")
def getGroupById(id):
    print(id)
    groupQuery = Group.query.get(id)

    print("************* backend", groupQuery.to_dict())

    return groupQuery.to_dict()

@group_routes.route("/", methods=["POST"])
def createGroup():
    form = NewGroupForm()

    newGroup = Group(name=form.name.data, description=form.description.data, owner_id=form.owner_id.data)

    db.session.add(newGroup)
    db.session.commit()

    return newGroup.to_dict()


@group_routes.route("/<int:id>", methods=["PUT"])
def editGroup(id):
    form = EditGroupForm()

    eGroup = Group.query.get(id)

    eGroup.name = form.name.data
    eGroup.description = form.description.data
    eGroup.owner_id = form.owner_id.data

    db.session.commit()

    return eGroup.to_dict()

@group_routes.route("/<int:id>", methods=["DELETE"])
def deleteGroup(id):

    group = Group.query.get(id)

    groupDet = group.to_dict()

    db.session.delete(group)

    db.session.commit()

    return groupDet

@group_routes.route("/<int:id>/events")
def getEvents(id):
    events = []

    eventListQuery = Event.query.filter(Event.group_id == id)
    eventList = eventListQuery.all()

    for event in eventList:
        events.append(event.to_dict())

    return events

@group_routes.route("/<int:gId>/events/<int:id>")
def getEventById(gId, id):

    eventQuery = Event.query.filter(Event.group_id == gId, Event.id == id)

    event = eventQuery.one()

    return event.to_dict()

@group_routes.route("<int:id>/events", methods=["POST"])
def createGroup():
    form = NewEventForm()

    newEvent = Event()

    db.session.add(newEvent)
    db.session.commit()

    return newEvent.to_dict()

@group_routes.route("/<int:gId>/events/<int:id>", methods=["PUT"])
def updateEvent(gId, id):

    eventQuery = Event.query.filter(Event.group_id == gId, Event.id == id)

    event = eventQuery.one()
