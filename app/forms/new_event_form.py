from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError

class NewEventForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    start_date = DateTimeField('start_date', validators=[DataRequired()])
    end_date = DateTimeField('end_date', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
