from app.models import db, Wallet


# Adds a demo user, you can add other users here if you want
def seed_wallets():
    wallet1 = Wallet(amount=100.00, user_id=1)
    wallet2 = Wallet(amount=1000.00, user_id=2)
    wallet3 = Wallet(amount=20000.00, user_id=3)

    db.session.add(wallet1)
    db.session.add(wallet2)
    db.session.add(wallet3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_wallets():
    db.session.execute('TRUNCATE wallets RESTART IDENTITY CASCADE;')
    db.session.commit()
