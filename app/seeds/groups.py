from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text

def seed_groups():
    sovg = Group(name="Sherman Oaks Vet Group", description="Vet Hospital", owner_id=5, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')
    aca = Group(name="Anime Characters Association", description="Where all the anime characters meet", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')
    gsmh = Group(name="Grey Sloan Memorial Hospital", description="Where all the surgeons and their drama meet", owner_id=11, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    db.session.add(sovg)
    db.session.add(aca)
    db.session.add(gsmh)
    db.session.commit()


def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
