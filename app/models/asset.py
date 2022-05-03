from sqlalchemy import ForeignKey
from .db import db
import simplejson as json
from decimal import Decimal

class Asset(db.Model):
    __tablename__= "assets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    stock_id = db.Column(db.Integer, ForeignKey('stocks.id'))
    num_shares = db.Column(db.Numeric(precision=8, scale=2))

    user = db.relationship('User', back_populates='asset')
    stock = db.relationship('Stock', back_populates='asset2')
    transaction = db.relationship('Transaction', back_populates='asset')

    def asset_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'num_shares': json.dumps(Decimal(self.num_shares), use_decimal=True),
            'user': self.user.to_dict_no_wallet(),
            'stock': self.stock.stock_to_dict(),
            # 'transaction': self.transaction.transaction_to_dict_no_asset()
        }

    def asset_to_dict_no_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'num_shares': json.dumps(Decimal(self.num_shares), use_decimal=True)
        }

    def asset_to_dict_no_stock(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'num_shares': json.dumps(Decimal(self.num_shares), use_decimal=True)
        }
