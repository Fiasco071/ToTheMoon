from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.watchlist import association_table
from app.models import Transaction, Stock, Asset, Wallet, db

watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/add/<int:id>', methods=['GET', 'POST'])
@login_required
def addToWatchlist(id):
    stock = Stock.query.filter(Stock.id == id).first()

    watch = association_table(
        user_id = current_user.to_dict()['id'],
        stock_id = stock.id
    )

    db.session.add(watch)
    db.session.commit()
    return association_table.watchlist_to_dict()

@watchlist_routes.route('/del/<int:id>', methods=['DELETE'])
# @login_required
def delToWatchlist(id):
    watch = association_table.query.filter(association_table.user_id == current_user.to_dict()['id'], association_table.stock_id == id)

    db.session.delete(watch)
    db.session.commit()
    return f'Deleted watchlist'
