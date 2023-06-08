from app.models import db, Group_Request, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_request():
    Nagisa = Group_Request(user_id=17, group_id=2)
    Tanjiro = Group_Request(user_id=18, group_id=2)
    Ash = Group_Request(user_id=19, group_id=2)

    db.session.add(Nagisa)
    db.session.add(Tanjiro)
    db.session.add(Ash)
    db.session.commit()



def undo_group_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_requests"))

    db.session.commit()
