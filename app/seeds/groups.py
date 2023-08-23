from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text

def seed_groups():
    sovg = Group(name="Sherman Oaks Vet Group", description="Vet Hospital", owner_id=5, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')
    aca = Group(name="Anime Characters Association", description="Where all the anime characters meet", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')
    gsmh = Group(name="Grey Sloan Memorial Hospital", description="Where all the surgeons and their drama meet", owner_id=11, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')
    #4
    armt = Group(name="Apple Risk Management Team", description="Risk Management for the company Apple", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #5
    rem = Group(name="Real Estate Marketing", description="Marketing for Real Estate Agents", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #6
    lrt = Group(name="Laptop Repair Team", description="Repairing Laptops and other electronics", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #7
    tct = Group(name="Telegram Coding Team", description="Meetup for all things coding concerning Coding", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #8
    ana = Group(name="American Nurses Association", description="Concerning all things nursing related in the U.S.", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #9
    brn = Group(name="Board of Registered Nursing", description="Assocation that issues nursing licenses", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #10
    tua = Group(name="Teacher Union Association", description="Where teachers combine to form unions and equal working rights", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #11
    lesl = Group(name="League of English is the Second Language", description="Fighting for preservation of original, native languages", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')

    #12
    mst = Group(name="Microsoft Sales Team", description="Microsoft team members in charge of sales", owner_id=6, img_url='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1673416530/samples/imagecon-group.jpg')


    db.session.add(sovg)
    db.session.add(aca)
    db.session.add(gsmh)
    db.session.add(armt)
    db.session.add(rem)
    db.session.add(lrt)
    db.session.add(tct)
    db.session.add(ana)
    db.session.add(brn)
    db.session.add(tua)
    db.session.add(lesl)
    db.session.add(mst)
    db.session.commit()


def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
