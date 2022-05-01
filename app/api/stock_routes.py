from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db


stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    response = {"stocks": [stock.stock_to_dict() for stock in stocks]}
    return response


@stock_routes.route('/<int:id>')
@login_required
def get_one_stock(id):
    stock = Stock.query.filter(Stock.id == id).one()
    return stock.stock_to_dict()
