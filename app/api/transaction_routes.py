from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction, Asset, Wallet, db

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
    transactions = Transaction.query.filter(Transaction.user_id == current_user.to_dict()['id']).all()
    return {"transactions": [transaction.transaction_to_dict() for transaction in transactions]}


@transaction_routes.route('/add', methods=["GET", "POST"])
@login_required
def new_transaction():
    curr_user = current_user.to_dict()
    wallet_amount = current_user.to_dict()['wallet']['amount']

    user_id = current_user.to_dict()['id']
    # asset_id = Asset.
    # num_shares = 
    # price_at_transaction = 



    return str(current_user.to_dict()['wallet']['amount'])
