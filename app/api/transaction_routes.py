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
def new_transaction(id):
    curr_user = current_user.to_dict()
    # wallet_amount = curr_user['wallet']['amount']
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    asset = Asset.query.filter(Asset.stock_id == id).one()
    user_id = curr_user['id']
    # num_shares = form.data.num_shares
    num_shares = 1 #will change later
    price_at_transaction = Stock.query.get(id)['i_price']
    total_price = price_at_transaction * num_shares

    if wallet.amount >= total_price:
        if asset:
            asset_id = asset.id
            asset.num_shares += num_shares
        else:
            num_shares += asset.num_shares
            asset = Asset(
                user_id=user_id,
                stock_id=id,
                num_shares=num_shares
            )
    
        new_transaction = Transaction(
            user_id=user_id,
            asset_id=asset.id,
            num_shares=num_shares,
            price_at_transaction=price_at_transaction
        )

        wallet.amount -= total_price

        db.session.add_all([wallet, asset, new_transaction])
        db.session.commit()

    else:
        return {'message': 'YOU BROKE; Add funds'}



@transaction_routes.route('/sell', methods='PUT')
@login_required
def sell_shares(id):
    curr_user = current_user.to_dict()
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    asset = Asset.query.filter(Asset.stock_id == id).one()
    user_id = curr_user['id']
    num_shares = 10 #will change later
    price_at_transaction = Stock.query.get(id)['i_price']
    total_price = price_at_transaction * num_shares

    if asset.num_shares >= num_shares:
        wallet.amount += total_price

        new_transaction = Transaction(
            user_id=user_id,
            asset_id=asset.id,
            num_shares=num_shares*-1,
            price_at_transaction=price_at_transaction
        )

        asset.num_shares -= num_shares

        db.session.add_all([wallet, asset, new_transaction])
        db.session.commit()
    
    else:
        return {'message': 'You cannot sell more shares than you own!'}



@transaction_routes.route('/cashout', methods=['PUT'])
@login_required
def cash_out(id):
    curr_user = current_user.to_dict()
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    # wallet_amount = curr_user['wallet']['amount']
    asset = Asset.query.filter(Asset.stock_id == id).one()
    user_id = curr_user['id']
    # num_shares = asset['num_shares']
    price_at_transaction = Stock.query.get(id)['i_price']
    total_price = price_at_transaction * asset.num_shares

    wallet.amount += total_price

    new_transaction = Transaction(
        user_id=user_id,
        asset_id=asset.id,
        num_shares=asset.num_shares*-1,
        price_at_transaction=price_at_transaction
    )

    asset.num_shares = 0

    db.session.add_all([wallet, asset, new_transaction])
    db.session.commit()