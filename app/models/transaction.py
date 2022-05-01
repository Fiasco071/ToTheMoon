from .db import db
from sqlalchemy import ForeignKey


class Transaction(db.Model):
    __tablename__= 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    asset_id = db.Column(db.Integer, ForeignKey('assets.id'), nullable=False)
    num_shares = db.Column(db.Integer, nullable=False)
    price_at_transaction = db.Column(db.Numeric(precision=8, scale=2), nullable=False)

    user = db.relationship('User', back_populates='transaction')
    asset = db.relationship('Asset', back_populates='transaction')
