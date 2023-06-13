from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(2000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    # groupPic = db.Column(db.String(2000), nullable=False)
    # calendar_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("calendars.id"), nullable=False))

    owner = db.relationship("User", secondary=add_prefix_for_prod(
        "group_members"), back_populates="group")
    group_member = db.relationship(
        "Group_Member", back_populates="group", cascade="all, delete-orphan")
    group_request = db.relationship(
        "Group_Request", back_populates="group", cascade="all, delete-orphan")
    event = db.relationship("Event", back_populates="group", cascade="all, delete-orphan")
    message = db.relationship(
        "Message", back_populates="group", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            "description": self.description,
            # "owner": self.owner.to_dict(),
            "owner_id": self.owner_id,
            # "groupPic": self.groupPic
        }
