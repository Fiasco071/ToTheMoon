from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Stock, Watchlist, db


watchlist_routes = Blueprint('watchlist', __name__)


@watchlist_routes.route('/')
@login_required
def getWatchlist():
    watchlist = Watchlist.query.filter(
        Watchlist.user_id == current_user.to_dict()['id']).all()
    return {'watchlist': [watch.watchlist_to_dict() for watch in watchlist]}


@watchlist_routes.route('/add/<int:id>', methods=['GET', 'POST'])
@login_required
def addToWatchlist(id):
    stock = Stock.query.filter(Stock.id == id).first()

    watch = Watchlist(
        user_id=current_user.to_dict()['id'],
        stock_id=stock.id
    )

    db.session.add(watch)
    db.session.commit()
    return watch.watchlist_to_dict()


@watchlist_routes.route('/del/<int:id>', methods=['DELETE'])
@login_required
def delToWatchlist(id):
    watchlist = Watchlist.query.get(id)
    db.session.delete(watchlist)
    db.session.commit()
    return f'Deleted watchlist'
