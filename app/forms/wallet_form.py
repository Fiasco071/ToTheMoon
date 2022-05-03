from flask_wtf import FlaskForm
from wtforms import DecimalField
from wtforms.validators import DataRequired, ValidationError
from decimal import ROUND_HALF_UP

def invalid_amount(form, field):
    # Checking if user exists
    amount = field.data
    if amount < 0:
        raise ValidationError('Value cannot be negative.')

class WalletForm(FlaskForm):
    amount = DecimalField('amount', places=2, rounding=ROUND_HALF_UP, validators=[DataRequired(), invalid_amount])
