from app.models import db, Asset

def seed_assets():
    asset1 = Asset(user_id=1, stock_id=1, num_shares=2)
    asset2 = Asset(user_id=2, stock_id=2, num_shares=3)
    asset3 = Asset(user_id=3, stock_id=3, num_shares=4)
    asset4 = Asset(user_id=1, stock_id=4, num_shares=5)
    asset5 = Asset(user_id=3, stock_id=5, num_shares=6)
    asset6 = Asset(user_id=2, stock_id=6, num_shares=7)
    asset7 = Asset(user_id=3, stock_id=7, num_shares=8)
    asset8 = Asset(user_id=1, stock_id=8, num_shares=9)
    asset9 = Asset(user_id=2, stock_id=9, num_shares=10)



    db.session.add_all([asset1, asset2, asset3, asset4, asset5, asset6, asset7, asset8, asset9])


    db.session.commit()


def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
