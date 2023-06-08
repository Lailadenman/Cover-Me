from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_events():
    # Dates need to be in the format 'y-m-d h:m:s'
    sovg1 = Event(description="I'm going on vacation", owner_id=1 , start_date="2023-06-05 07:30:00", end_date="2023-06-05 14:00:00", group_id=1, isCovered=False )
    sovg2 = Event(description="I have my daughter's recital", owner_id=2 , start_date="2023-06-14 08:30:00", end_date="2023-06-14 16:00:00", group_id=1, isCovered=False )
    sovg3 = Event(description="I have a wedding to go to", owner_id=3 , start_date="2023-06-18 09:00:00", end_date="2023-06-18 16:00:00", group_id=1, isCovered=False )
    aca1 = Event(description="I'm getting married", owner_id= 6, start_date="2023-06-02 07:30:00", end_date="2023-06-02 16:00:00", group_id=2, isCovered=False)
    aca2 = Event(description="I'm having a baby", owner_id= 7, start_date="2023-06-22 14:00:00", end_date="2023-06-22 20:00:00", group_id=2, isCovered=False)
    aca3 = Event(description="It's my birthday", owner_id= 8, start_date="2023-06-17 10:00:00", end_date="2023-06-17 16:00:00", group_id=2, isCovered=False)
    gsmh1 = Event(description="My partner is having a baby", owner_id= 11, start_date="2023-06-22 16:00:00", end_date="2023-06-22 20:00:00", group_id=3, isCovered=False)
    gsmh2 = Event(description="I have a funeral", owner_id= 12, start_date="2023-06-27 07:30:00", end_date="2023-06-27 19:00:00", group_id=3, isCovered=False)
    gsmh3 = Event(description="I'm having surgery", owner_id= 13, start_date="2023-06-28 08:30:00", end_date="2023-06-14 18:30:00", group_id=3, isCovered=False)

    db.session.add(sovg1)
    db.session.add(sovg2)
    db.session.add(sovg3)
    db.session.add(aca1)
    db.session.add(aca2)
    db.session.add(aca3)
    db.session.add(gsmh1)
    db.session.add(gsmh2)
    db.session.add(gsmh3)
    db.session.commit()


def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
