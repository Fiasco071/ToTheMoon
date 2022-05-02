from app.models import db, Transaction

def seed_transactions():
    transaction1 = Transaction(user_id=1, asset_id=1, num_shares=2, price_at_transaction=125.56)
    transaction2 = Transaction(user_id=2, asset_id=2, num_shares=3, price_at_transaction=75.80)
    transaction3 = Transaction(user_id=3, asset_id=3, num_shares=4, price_at_transaction=100.56)
    transaction4 = Transaction(user_id=1, asset_id=4, num_shares=5, price_at_transaction=55.66)
    transaction5 = Transaction(user_id=3, asset_id=5, num_shares=6, price_at_transaction=175.25)
    transaction6 = Transaction(user_id=2, asset_id=6, num_shares=7, price_at_transaction=200.35)
    transaction7 = Transaction(user_id=3, asset_id=7, num_shares=8, price_at_transaction=12005.56)
    transaction8 = Transaction(user_id=1, asset_id=8, num_shares=9, price_at_transaction=42500.56)
    transaction9 = Transaction(user_id=2, asset_id=9, num_shares=10, price_at_transaction=25.00)


    db.session.add_all([transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7, transaction8, transaction9])


    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
