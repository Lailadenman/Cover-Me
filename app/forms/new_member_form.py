from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class NewMemberForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
