from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    profPic = db.Column(db.String(2000), server_default="https://res.cloudinary.com/dbiv2lwhp/image/upload/v1689305282/autoimg_w9fhxl.jpg")
    bio = db.Column(db.String(2000), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    group = db.relationship("Group", secondary=add_prefix_for_prod("group_members"), back_populates="owner")
    group_member = db.relationship("Group_Member", back_populates="user", cascade="all, delete-orphan")
    group_request = db.relationship("Group_Request", back_populates="user", cascade="all, delete-orphan")
    event = db.relationship("Event", back_populates="owner", cascade="all, delete-orphan", foreign_keys='Event.coveredBy')
    cover_event = db.relationship("Event", back_populates="cover", cascade="all, delete-orphan", foreign_keys='Event.coveredBy')
    message = db.relationship("Message", back_populates="user", cascade="all, delete-orphan")
    room = db.relationship("ChatRoom", back_populates="user", cascade="all, delete-orphan", foreign_keys='ChatRoom.user_id')
    room_receiver = db.relationship("ChatRoom", back_populates="receiver", cascade="all, delete-orphan", foreign_keys='ChatRoom.receiver_id')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'profPic': self.profPic,
            'bio': self.bio
        }
