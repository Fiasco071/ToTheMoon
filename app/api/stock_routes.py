from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, db

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return [stock.stock_to_dict() for stock in stocks]
