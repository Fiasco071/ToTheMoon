from .db import db

class Stock(db.Model):
    __tablename__= "stocks"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(6))
    long_name = db.Column(db.String(50))
    i_price = db.Column(db.Numeric(precision=8, scale=2))
    info1 = db.Column(db.String(255))
    info2 = db.Column(db.String(255))
    info3 = db.Column(db.String(255))

    asset2 = db.relationship('Asset', back_populates='stock')

    def stock_to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'long_name': self.long_name,
            'i_price' : self.i_price,
            'info1' : self.info1,
            'info2' : self.info2,
            'info3' : self.info3
        }
