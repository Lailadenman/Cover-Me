from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event
from app.forms import CalendarForm
import calendar

calendar_routes = Blueprint('calendar', __name__)

@calendar_routes.route("/")
def getCalendar():
    htmlCal = calendar.HTMLCalendar(firstweekday=0)

    form = CalendarForm()

    year = form.year.data
    month = form.month.data

    return htmlCal.formatmonth(year, month)
