from sqlalchemy import Table, Column, ForeignKey
from .db import db

association_table = Table('association', db.Model.metadata,
    Column('left_id', ForeignKey('users.id'), primary_key=True),
    Column('right_id', ForeignKey('assets.id'), primary_key=True)
)


watchlist_table = Table('watchlist', db.Model.metadata,
Column('user_id', ForeignKey('users.id'), primary_key=True),
Column('stock_id', ForeignKey('stocks.id'), primary_key=True)
)
