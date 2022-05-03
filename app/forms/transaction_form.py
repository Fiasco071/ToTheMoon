from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class TransactionFrom(FlaskForm):
    num_shares = IntegerField('num_shares', validators=[DataRequired()])
