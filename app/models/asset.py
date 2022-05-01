from sqlalchemy import ForeignKey
from .db import db

class Asset(db.Model):
    __tablename__= "assets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    stock_id = db.Column(db.Integer, ForeignKey('stocks.id'))
    num_shares = db.Column(db.Numeric(precision=8, scale=2))

    user = db.relationship('User', back_populates='asset')
    stock = db.relationship('Stock', back_populates='asset2')
    transaction = db.relationship('Transaction', back_populates='asset')

    # def stock_to_dict(self):
    #     return {
    #         'id': self.id,
    #         'ticker': self.ticker,
    #         'long_name': self.long_name,
    #         'i_price' : self.i_price,
    #         'info1' : self.info1,
    #         'info2' : self.info2,
    #         'info3' : self.info3
    #     }
