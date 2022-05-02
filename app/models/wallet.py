from sqlalchemy import ForeignKey
from .db import db
import simplejson as json
from decimal import Decimal

class Wallet(db.Model):
    __tablename__= "wallets"
    
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(precision=8, scale=2), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    
    user = db.relationship("User", back_populates="wallet")
    
    def wallet_to_dict(self):
        return {
            'id': self.id,
            'amount': json.dumps(Decimal(self.amount), use_decimal=True),
            'user_id': self.user_id,
            'user' : self.user.to_dict_no_wallet()         
        }
        
    def to_dict_no_user(self):
        return {
            'id': self.id,
            'amount': json.dumps(Decimal(self.amount), use_decimal=True),
            'user_id': self.user_id
        }