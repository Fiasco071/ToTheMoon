from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Asset, db


asset_routes = Blueprint('assets', __name__)

@asset_routes.route('/')
def get_all_assets():
    assets = Asset.query.filter(Asset.user_id == current_user.to_dict()['id']).all()
    return {'assets': [asset.asset_to_dict() for asset in assets]}