from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Wallet, db

wallet_routes = Blueprint('wallet', __name__)

@wallet_routes.route('/')
@login_required
def getWalletAmount():
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    return wallet.wallet_to_dict()

@wallet_routes.route('/add')
@login_required
def addToWallet():
        
    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    wallet.amount = wallet.amount + 1000.0
    db.session.add(wallet)
    db.session.commit()
    
    return wallet.wallet_to_dict()


@wallet_routes.route('/del')
@login_required
def cashOutWallet():

    wallet = Wallet.query.filter(Wallet.user_id == current_user.to_dict()['id']).one()
    wallet.amount = 0.0
    db.session.add(wallet)
    db.session.commit()
    
    return wallet.wallet_to_dict()