from .db import db
from sqlalchemy import ForeignKey


class Transaction(db.Model):
    __tablename__= 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    asset_id = db.Column(db.Integer, ForeignKey('assets.id'), nullable=False)
    num_shares = db.Column(db.Integer, nullable=False)
    price_at_transaction = 
