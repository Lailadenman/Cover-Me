from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws import ALLOWED_EXTENSIONS
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class NewGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    groupPic = StringField("groupPic", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
