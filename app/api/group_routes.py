from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group, Group_Member, Group_Request, Event, User, Message, db
from app.forms import NewGroupForm, EditGroupForm, NewEventForm, EditEventForm, GroupRequestForm

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

    members = []

    memberRel_query = Group_Member.query.filter(Group_Member.group_id == id)

    memberRel = memberRel_query.all()

    for rel in memberRel:
        members.append(rel.to_dict())

    requests = []

    requestRel_query = Group_Request.query.filter(Group_Request.group_id == id)

    requestRel = requestRel_query.all()

    for rel in requestRel:
        print(rel.to_dict())
        requests.append(rel.to_dict())

    group = groupQuery.to_dict()

    print("<<<<<<<<<<<<<<<<<<<<owner id is", group['owner_id'])

    owner = User.query.get(group['owner_id'])

    messagesQuery = Message.query.filter(Message.group_id == id)

    messages = messagesQuery.all()

    messagesArr = []

    for message in messages:
        print(message.to_dict())
        messagesArr.append(message.to_dict())

    group['members'] = members

    group['requests'] = requests

    group['owner'] = owner.firstName + " " + owner.lastName

    group['messages'] = messagesArr

    return group


@group_routes.route("/", methods=["POST"])
def createGroup():
    form = NewGroupForm()

    newGroup = Group(name=form.name.data,
                     description=form.description.data, owner_id=form.owner_id.data)

    db.session.add(newGroup)
    db.session.commit()

    print("##################", newGroup.id)

    newMem = Group_Member(user_id=form.owner_id.data, group_id=newGroup.id)

    db.session.add(newMem)
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
def createEvent(id):
    form = NewEventForm()

    # print('*****************', form.description.data)
    print('*****************', form.start_date.data)

    newEvent = Event(description=form.description.data, owner_id=form.owner_id.data,
                     start_date=form.start_date.data, end_date=form.end_date.data, group_id=id, isCovered=False)

    db.session.add(newEvent)
    db.session.commit()

    return newEvent.to_dict()


@group_routes.route("/<int:gId>/events/<int:id>", methods=["PUT"])
def updateEvent(gId, id):

    form = EditEventForm()

    eventQuery = Event.query.filter(Event.group_id == gId, Event.id == id)

    event = eventQuery.one()

    event.description = form.description.data
    event.owner_id = form.owner_id.data
    event.start_date = form.start_date.data
    event.end_date = form.end_date.data
    event.group_id = form.group_id.data

    db.session.commit()

    return event.to_dict()


@group_routes.route("<int:gId>/events/<int:id>", methods=["DELETE"])
def deleteEvent(gId, id):

    eventQuery = Event.query.filter(Event.group_id == gId, Event.id == id)

    event = eventQuery.one()

    eventDet = event.to_dict()

    db.session.delete(event)

    db.session.commit()

    return eventDet
