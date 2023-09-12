from app.models import db, Group_Request, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_request():
    Nagisa = Group_Request(user_id=17, group_id=2)
    Tanjiro = Group_Request(user_id=18, group_id=2)
    Ash = Group_Request(user_id=19, group_id=2)
    Ash4 = Group_Request(user_id=19, group_id=4)
    Ash5 = Group_Request(user_id=19, group_id=5)
    Ash6 = Group_Request(user_id=19, group_id=6)
    Ash7 = Group_Request(user_id=19, group_id=7)
    Ash8 = Group_Request(user_id=19, group_id=8)
    Ash9 = Group_Request(user_id=19, group_id=9)
    Ash10 = Group_Request(user_id=19, group_id=10)
    Ash11 = Group_Request(user_id=19, group_id=11)
    Ash12 = Group_Request(user_id=19, group_id=12)
    Nagisa4 = Group_Request(user_id=17, group_id=4)
    Nagisa5 = Group_Request(user_id=17, group_id=5)
    Nagisa6 = Group_Request(user_id=17, group_id=6)
    Nagisa7 = Group_Request(user_id=17, group_id=7)
    Nagisa8 = Group_Request(user_id=17, group_id=8)
    Nagisa9 = Group_Request(user_id=17, group_id=9)
    Nagisa10 = Group_Request(user_id=17, group_id=10)
    Nagisa11 = Group_Request(user_id=17, group_id=11)
    Nagisa12 = Group_Request(user_id=17, group_id=12)

    db.session.add(Nagisa)
    db.session.add(Tanjiro)
    db.session.add(Ash)
    db.session.add(Ash4)
    db.session.add(Ash5)
    db.session.add(Ash6)
    db.session.add(Ash7)
    db.session.add(Ash8)
    db.session.add(Ash9)
    db.session.add(Ash10)
    db.session.add(Ash11)
    db.session.add(Ash12)
    db.session.add(Nagisa4)
    db.session.add(Nagisa5)
    db.session.add(Nagisa6)
    db.session.add(Nagisa7)
    db.session.add(Nagisa8)
    db.session.add(Nagisa9)
    db.session.add(Nagisa10)
    db.session.add(Nagisa11)
    db.session.add(Nagisa12)
    db.session.commit()



def undo_group_requests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_requests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_requests"))

    db.session.commit()
