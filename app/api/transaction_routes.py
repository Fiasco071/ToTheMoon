from flask import Blueprint, request
from flask_login import login_required, current_user
from decimal import Decimal
from app.forms.transaction_form import TransactionFrom
from app.models import Transaction, Stock, Asset, Wallet, db

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
    transactions = Transaction.query.filter(Transaction.user_id == current_user.to_dict()['id']).all()
    return {"transactions": [transaction.transaction_to_dict() for transaction in transactions]}


@transaction_routes.route('/<int:id>/add', methods=["GET", "POST"])
@login_required
def new_transaction(id): #need to add id back later
    curr_user = current_user.to_dict()
    # wallet_amount = curr_user['wallet']['amount']
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    asset = Asset.query.filter(Asset.stock_id == id).first()
    user_id = curr_user['id']

    form = TransactionFrom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        num_shares = form.data['num_shares']
        price_at_transaction = Stock.query.get(id).stock_to_dict()['i_price']
        total_price = float(price_at_transaction) * num_shares


        if wallet.amount >= total_price:
            if asset is not None:
                asset.num_shares += num_shares
            else:
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

            wallet.amount -= Decimal(total_price)

            db.session.add_all([wallet, asset, new_transaction])
            db.session.commit()
            return wallet.to_dict_no_user()
        else:
            return {'message': 'YOU BROKE; Add funds'}
    return {'error': form.errors}


@transaction_routes.route('/<int:id>/sell', methods=['GET','POST'])
@login_required
def sell_shares(id): #need to add id back later
    curr_user = current_user.to_dict()
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    asset = Asset.query.filter(Asset.stock_id == id).one()
    user_id = curr_user['id']
    form = TransactionFrom()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        num_shares = form.data['num_shares']
        price_at_transaction = Stock.query.get(id).stock_to_dict()['i_price']
        total_price = float(price_at_transaction) * num_shares

        if asset.num_shares >= num_shares:
            wallet.amount += Decimal(total_price)

            new_transaction = Transaction(
                user_id=user_id,
                asset_id=asset.id,
                num_shares=num_shares*-1,
                price_at_transaction=price_at_transaction
            )

            asset.num_shares -= num_shares

            db.session.add_all([wallet, asset, new_transaction])
            db.session.commit()

            transactions = Transaction.query.filter(Transaction.user_id == current_user.to_dict()['id']).all()
            return {"transactions": [transaction.transaction_to_dict() for transaction in transactions]}

        else:
            return {'message': 'You cannot sell more shares than you own!'}
    return {'error': form.errors}



@transaction_routes.route('/<int:id>/cashout', methods=['GET','POST'])
@login_required
def cash_out(id): #will add id back later
    curr_user = current_user.to_dict()
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    # wallet_amount = curr_user['wallet']['amount']
    asset = Asset.query.filter(Asset.stock_id == id).one()
    user_id = curr_user['id']
    # num_shares = asset['num_shares']
    price_at_transaction = Stock.query.get(id).stock_to_dict()['i_price']
    total_price = float(price_at_transaction) * float(asset.num_shares)


    wallet.amount += Decimal(total_price)

    new_transaction = Transaction(
        user_id=user_id,
        asset_id=asset.id,
        num_shares=asset.num_shares*-1,
        price_at_transaction=price_at_transaction
    )

    asset.num_shares = 0

    db.session.add_all([wallet, asset, new_transaction])
    db.session.commit()

    transactions = Transaction.query.filter(Transaction.user_id == current_user.to_dict()['id']).all()
    return {"transactions": [transaction.transaction_to_dict() for transaction in transactions]}
