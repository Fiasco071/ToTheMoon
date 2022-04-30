from sqlalchemy import ForeignKey
from .db import db

class Wallet(db.Model):
    __tablename__= "wallets"
    
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    
    users = db.relationship("User", back_populates="wallet")
    
    