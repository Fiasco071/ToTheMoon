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
    #Test Stock
    # NUM_SIMS = 1000 #constant variable, shouldn't change
    # NUM_DAYS = 252 #constant variable, shouldn't change
    # day_count = 1 #counter variable to count days, will need to change
    # #will vary depending on fake stock
    # initial_price = 100  #i_price from stock
    # drift_annual = 0.10  #made up percentage (in this case 10%)
    # volatility_annual = 0.40 #made up percentage (in this case 40%) 
    # #formulas for our data calculations
    # series_of_prices = []
    # year_projection_prices = [initial_price]
    # while day_count <= NUM_DAYS:
    #     for p in range(NUM_SIMS):
    #         drift_daily = drift_annual/NUM_DAYS
    #         volatility_daily = volatility_annual/(sqrt(NUM_DAYS))
    #         drift_mean = drift_daily-(0.5)*(volatility_daily**2)
    #         log_return = drift_mean+np.random.normal(drift_mean, volatility_daily, 1)[0]*(randint(-400, 400)/100)
    #         # log_return = drift_mean+volatility_daily*(normal(-400, 400)/100)
    #         # print(log_return)
    #         price = (year_projection_prices[-1])*exp(log_return)
    #         series_of_prices.append(price)
    #     avg = sum(series_of_prices)/NUM_SIMS
    #     # print(avg)
    #     series_of_prices = []
    #     year_projection_prices.append(round(avg, 2))
    #     day_count += 1
    # print(year_projection_prices)
    return {"sim_data": main()}
