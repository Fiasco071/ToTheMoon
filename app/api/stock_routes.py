from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db
#testing files will delete eventually
from random import randint
from math import sqrt, exp
import numpy as np
from .gbm_simulation import main


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






#graph testing
@stock_routes.route('/test')
@login_required
def get_sim_data():
    
    stocks = Stock.query.all()
    stocklist = [[stock.id, stock.i_price] for stock in stocks]
    # print(stocklist)

    stock_data_set = [float(multiplier) * float(stocklist[0][1])+ float(stocklist[0][1]) for multiplier in list(main().values())]
    
    def simulate_stock_data(i):
        return [float(multiplier) * float(stocklist[i][1])+ float(stocklist[i][1]) for multiplier in list(main().values())]
    
    
    ### now that i ahve a single list, lets create a dict with stock1: stocks_data_set1, stock2: stocks_data_set2, ... etc
    
    blk_data_set = {stocklist[i][0] : simulate_stock_data(i) for i in range(len(stocklist))}

    
    
    return {"sim_data": blk_data_set}
