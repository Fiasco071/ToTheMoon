from flask_wtf import FlaskForm
from wtforms import DecimalField
from wtforms.validators import DataRequired


class TransactionFrom(FlaskForm):
    num_shares = DecimalField('num_shares', places=2, validators=[DataRequired()])
