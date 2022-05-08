from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .jtable import association_table
from .watchlist import Watchlist
from app.models.stock import Stock

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    wallet = db.relationship("Wallet", back_populates="user", uselist=False)
    asset = db.relationship('Asset', secondary=association_table, back_populates='user')
    transaction = db.relationship('Transaction', back_populates='user')
    stocks = db.relationship("Watchlist", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'wallet': self.wallet.to_dict_no_user(),
            'transactions': [transaction.transaction_to_dict_no_user() for transaction in self.transaction]
        }

    def to_dict_no_wallet(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }
