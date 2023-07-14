from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class NewMessageForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
    room_id = IntegerField("room_id")
    group_id = IntegerField("group_id")
