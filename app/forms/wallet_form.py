from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

def invalid_amount(form, field):
    # Checking if user exists
    amount = field.data
    if amount < 0:
        raise ValidationError('Value cannot be negative.')

class WalletForm(FlaskForm):
    amount = IntegerField('amount', validators=[DataRequired(), invalid_amount])
    
