from .db import db, environment, SCHEMA, add_prefix_for_prod

class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(2000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    start_date = db.Column(db.String(250), nullable=False)
    end_date = db.Column(db.String(250), nullable=False)
    isCovered = db.Column(db.Boolean, nullable=False)
    coveredBy = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=True)
    # isMeeting = db.Column(db.Boolean, nullable=True)
    # isRequired = db.Column(db.Boolean, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)
    # calendar_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("calendars.id"), nullable=False))

    cover = db.relationship("User", back_populates="cover_event", foreign_keys='Event.coveredBy')
    owner = db.relationship("User", back_populates="event", foreign_keys='Event.owner_id')
    group = db.relationship("Group", back_populates="event")

    def to_dict(self):
        return {
            'id': self.id,
            "description": self.description,
            "owner_id": self.owner_id,
            "group_id": self.group_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "owner": self.owner.to_dict(),
            "isCovered": self.isCovered,
        }
