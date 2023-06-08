from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class EditGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
