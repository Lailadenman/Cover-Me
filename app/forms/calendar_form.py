from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

class CalendarForm(FlaskForm):
    year = IntegerField('year', validators=[DataRequired()])
    month = IntegerField('month', validators=[DataRequired()])
