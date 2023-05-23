from app.models import db, Group_Member, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_members():
    demo = Group_Member(user_id=1)
    marnie = Group_Member(user_id=2)
    bobbie = Group_Member(user_id=3)
    Bruno = Group_Member(user_id=4)
    Laila = Group_Member(user_id=5)
    Gojo = Group_Member(user_id=6)
    Killua = Group_Member(user_id=7)
    Sebastian = Group_Member(user_id=8)
    Yami = Group_Member(user_id=9)
    Naruto = Group_Member(user_id=10)
    Meredith = Group_Member(user_id=11)
    Derek = Group_Member(user_id=12)
    Alex = Group_Member(user_id=13)
    Cristina = Group_Member(user_id=14)
    Mark = Group_Member(user_id=15)
    George = Group_Member(user_id=16)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Bruno)
    db.session.add(Laila)
    db.session.add(Gojo)
    db.session.add(Killua)
    db.session.add(Sebastian)
    db.session.add(Yami)
    db.session.add(Naruto)
    db.session.add(Meredith)
    db.session.add(Derek)
    db.session.add(Alex)
    db.session.add(Cristina)
    db.session.add(Mark)
    db.session.add(George)
    db.session.commit()



def undo_group_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.group_members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_members"))

    db.session.commit()
