from app.models import db, Stock


# Adds a demo user, you can add other users here if you want
def seed_stocks():
    stock1 = Stock(ticker='RQM666', long_name='Rami Martinez SWAG', i_price=42069.69)
    stock2 = Stock(ticker='KJHK', long_name='BUSSIN BUSSIN CORP', i_price=39.27)
    stock3 = Stock(ticker='MUKH', long_name='POOGLE', i_price=49.69)
    stock4 = Stock(ticker='FSGF', long_name='APP ACADEMY', i_price=.69)
    stock5 = Stock(ticker='AKJBA', long_name='BLAMAZON', i_price=2.07)
    stock6 = Stock(ticker='KSJHD', long_name='YAHOO', i_price=123.46)
    stock7 = Stock(ticker='78EF', long_name='PIZZA HUTT INTERNATIONAL', i_price=78.87)
    stock8 = Stock(ticker='DFCJ', long_name='POKEMON', i_price=99999.99)
    stock9 = Stock(ticker='BVCF', long_name='TACO BELL', i_price=1234.56)
    

    db.session.add_all([stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8, stock9])
  

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities

def undo_stocks():
    db.session.execute('TRUNCATE stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
