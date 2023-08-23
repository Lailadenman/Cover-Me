from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class SearchGroupForm(FlaskForm):
    keyword = StringField('keyword', validators=[DataRequired()])
