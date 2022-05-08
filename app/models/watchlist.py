from sqlalchemy import Column, ForeignKey
from .db import db
import datetime


class Watchlist(db.Model):
    __tablename__ = 'watchlist'
    id = db.Column(db.Integer, primary_key=True)
    user_id = Column(ForeignKey('users.id'))
    stock_id = Column(ForeignKey('stocks.id'))
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates="stocks")
    stock = db.relationship("Stock", back_populates="users")


    def watchlist_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'created_at': self.created_at,
        }
