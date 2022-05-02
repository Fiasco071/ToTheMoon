from .db import db
from sqlalchemy import ForeignKey
import simplejson as json
from decimal import Decimal


class Transaction(db.Model):
    __tablename__= 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    asset_id = db.Column(db.Integer, ForeignKey('assets.id'), nullable=False)
    num_shares = db.Column(db.Integer, nullable=False)
    price_at_transaction = db.Column(db.Numeric(precision=8, scale=2), nullable=False)

    user = db.relationship('User', back_populates='transaction')
    asset = db.relationship('Asset', back_populates='transaction')


    def transaction_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'asset_id': self.asset_id,
            'num_shares': self.num_shares,
            'price_at_transaction': json.dumps(Decimal(self.price_at_transaction), use_decimal=True),
            'user': self.user.to_dict_no_wallet(),
            'asset': self.asset.asset_to_dict_no_user()
        }

    def transaction_to_dict_no_user(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'num_shares': self.num_shares,
            'price_at_transaction': json.dumps(Decimal(self.price_at_transaction), use_decimal=True)
        }

    def transaction_to_dict_no_asset(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'num_shares': self.num_shares,
            'price_at_transaction': json.dumps(Decimal(self.price_at_transaction), use_decimal=True)
        }
