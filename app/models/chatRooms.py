from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class ChatRoom(db.Model):
    __tablename__ = 'rooms'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="room", foreign_keys="ChatRoom.user_id")
    receiver = db.relationship("User", back_populates="room_receiver", foreign_keys="ChatRoom.receiver_id")
    message = db.relationship("Message", back_populates="room", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "receiver_id": self.receiver_id,
            "user": self.user.to_dict(),
            "username": self.user.username,
            "receiver": self.receiver.to_dict(),
            "receiver_username": self.receiver.username
        }
