from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)
    message = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="message")
    group = db.relationship("Group", back_populates="message")

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "message": self.message,
            "group": self.group.to_dict(),
            "user": self.user.to_dict(),
            "username": self.user.username
        }
