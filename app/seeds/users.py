from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # 1
    demo = User(
        username='Demo', firstName='Demo', lastName='lition', bio="I'm a demo user", email='demo@aa.io', password='password')
    # 2
    marnie = User(
        username='marnie', firstName='Marnie', lastName='Farber', bio="My name is marnie", email='marnie@aa.io', password='password')
    # 3
    bobbie = User(
        username='bobbie', firstName='Bobbie', lastName='Lyte', bio="My name is bobbie", email='bobbie@aa.io', password='password')
    # 4
    Bruno = User(
        username='B_man', firstName='Bruno', lastName='Fagundes', bio="I was 3%", email='bruno@aa.io', password='password')
    # 5
    Laila = User(
        username='Lailaaaaad', firstName='Laila', lastName='Denman', bio="I made this site", email='laila@aa.io', password='password')
    # 6
    Gojo = User(
        username='Limitless', firstName='Gojo', lastName='Satoru', bio="I am literally the most powerful anime character", email='sixeyes@aa.io', password='password')
    # 7
    Killua = User(
        username='Killuax', firstName='Killua', lastName='Zoldyck', bio="I'm literally the best assassin", email='kilzo@aa.io', password='password')
    # 8
    Sebastian = User(
        username='black_butler', firstName='Sebastion', lastName='Michaelis', bio="I'm one hell of a butler", email='bbutler@aa.io', password='password')
    # 9
    Yami = User(
        username='cpt_blk_bull', firstName='Yami', lastName='Sukehiro', bio="I'm the captain of the black bulls", email='destrutiongod@aa.io', password='password')
    # 10
    Naruto = User(
        username='hokage_5', firstName='Naruto', lastName='Uzumaki', bio="Literally the best hokage", email='ninetails@aa.io', password='password')
    # 11
    Meredith = User(
        username='mer_1', firstName='Meredith', lastName='Grey', bio="Pick me, love me, choose me or whatever she said", email='surg1@aa.io', password='password')
    # 12
    Derek = User(
        username='mcdreamy', firstName='Derek', lastName='Shepherd', bio="Homie had no reason to die omg", email='neuro@aa.io', password='password')
    # 13
    Alex = User(
        username='boy_wonder', firstName='Alex', lastName='Karev', bio="My fav character", email='karev@aa.io', password='password')
    # 14
    Cristina = User(
        username='cardio_god', firstName='Cristina', lastName='Yang', bio="She had no reason to completely leave the show omg", email='cardio@aa.io', password='password')
    # 15
    Mark = User(
        username='mcsteamy', firstName='Mark', lastName='Sloan', bio="He was on his redemption when he died smh", email='plastics@aa.io', password='password')
    # 16
    George = User(
        username='007', firstName='George', lastName="O'Malley", bio="LITERALLY DIED FOR NO REASON", email='007@aa.io', password='password')

    # Users used for requests/not in groups yet
    # 17
    Nagisa = User(
        username='Cobra', firstName='Nagisa', lastName="Shiota", bio="Underestimated", email='assassination@aa.io', password='password')
    # 18
    Tanjiro = User(
        username='slayer_00', firstName='Tanjiro', lastName="Kamado", bio="Water breather", email='dsc@aa.io', password='password')
    # 19
    Ash = User(
        username='lynx', firstName='Aslan', lastName="Callenreese", bio="HE IS NOT DEAD", email='bananafish@aa.io', password='password')


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
    db.session.add(Nagisa)
    db.session.add(Tanjiro)
    db.session.add(Ash)
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
