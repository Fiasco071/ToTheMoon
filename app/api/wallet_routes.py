from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Wallet, db
from app.forms.wallet_form import WalletForm

wallet_routes = Blueprint('wallet', __name__)


@wallet_routes.route('/')
@login_required
def getWalletAmount():
    wallet = Wallet.query.filter(
        Wallet.user_id == current_user.to_dict()['id']).one()
    return wallet.wallet_to_dict()


@wallet_routes.route('/add', methods=['GET', "POST"])
@login_required
def addToWallet():

    form = WalletForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        wallet = Wallet.query.filter(
            Wallet.user_id == current_user.to_dict()['id']).one()
        wallet.amount = wallet.amount + form.data["amount"]
        db.session.add(wallet)
        db.session.commit()

        return wallet.to_dict_no_user()

    return {"error": form.errors}

# Another route for updating different amount (i.e. cashing out PORTION OF IT)


@wallet_routes.route('/update', methods=['GET', 'POST'])
@login_required
def cashabitOutWallet():

    form = WalletForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        wallet = Wallet.query.filter(
            Wallet.user_id == current_user.to_dict()['id']).one()
        if wallet.amount > form.data["amount"]:
            wallet.amount = wallet.amount - form.data["amount"]
            db.session.add(wallet)
            db.session.commit()

            return wallet.to_dict_no_user()
        else:
            form.errors.append("YOU AINT GOT ENOUGH MONEY!")
    return {"error": form.errors}


@wallet_routes.route('/del', methods=['POST'])
@login_required
def cashOutWallet():

    wallet = Wallet.query.filter(
        Wallet.user_id == current_user.to_dict()['id']).one()
    wallet.amount = 0.0
    db.session.add(wallet)
    db.session.commit()

    return wallet.wallet_to_dict()
