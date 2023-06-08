from app.models import db, Group_Member, environment, SCHEMA
from sqlalchemy.sql import text

def seed_group_members():
    demo = Group_Member(user_id=1, group_id=1)
    marnie = Group_Member(user_id=2, group_id=1)
    bobbie = Group_Member(user_id=3, group_id=1)
    Bruno = Group_Member(user_id=4, group_id=1)
    Laila = Group_Member(user_id=5, group_id=1)
    Gojo = Group_Member(user_id=6, group_id=2)
    Killua = Group_Member(user_id=7, group_id=2)
    Sebastian = Group_Member(user_id=8, group_id=2)
    Yami = Group_Member(user_id=9, group_id=2)
    Naruto = Group_Member(user_id=10, group_id=2)
    Meredith = Group_Member(user_id=11, group_id=3)
    Derek = Group_Member(user_id=12, group_id=3)
    Alex = Group_Member(user_id=13, group_id=3)
    Cristina = Group_Member(user_id=14, group_id=3)
    Mark = Group_Member(user_id=15, group_id=3)
    George = Group_Member(user_id=16, group_id=3)

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
