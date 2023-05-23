from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstName='Demo', lastName='lition', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', firstName='Marnie', lastName='Farber', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', firstName='Bobbie', lastName='Lyte', email='bobbie@aa.io', password='password')
    Bruno = User(
        username='B_man', firstName='Bruno', lastName='Fagundes', email='bruno@aa.io', password='password')
    Laila = User(
        username='Lailaaaaad', firstName='Laila', lastName='Denman', email='laila@aa.io', password='password')
    Gojo = User(
        username='Limitless', firstName='Gojo', lastName='Satoru', email='sixeyes@aa.io', password='password')
    Killua = User(
        username='Killuax', firstName='Killua', lastName='Zoldyck', email='kilzo@aa.io', password='password')
    Sebastian = User(
        username='black_butler', firstName='Sebastion', lastName='Michaelis', email='bbutler@aa.io', password='password')
    Yami = User(
        username='cpt_blk_bull', firstName='Yami', lastName='Sukehiro', email='destrutiongod@aa.io', password='password')
    Naruto = User(
        username='hokage_5', firstName='Naruto', lastName='Uzumaki', email='ninetails@aa.io', password='password')
    Meredith = User(
        username='mer_1', firstName='Meredith', lastName='Grey', email='surg1@aa.io', password='password')
    Derek = User(
        username='mcdreamy', firstName='Derek', lastName='Shepherd', email='neuro@aa.io', password='password')
    Alex = User(
        username='boy_wonder', firstName='Alex', lastName='Karev', email='karev@aa.io', password='password')
    Cristina = User(
        username='cardio_god', firstName='Cristina', lastName='Yang', email='cardio@aa.io', password='password')
    Mark = User(
        username='mcsteamy', firstName='Mark', lastName='Sloan', email='plastics@aa.io', password='password')
    George = User(
        username='007', firstName='George', lastName="O'Malley", email='007@aa.io', password='password')

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


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
