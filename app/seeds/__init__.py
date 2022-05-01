from flask.cli import AppGroup

from app.seeds.assets import seed_assets
from .users import seed_users, undo_users
from .wallets import seed_wallets, undo_wallets
from .stocks import seed_stocks, undo_stocks
from .assets import seed_assets, undo_assets
from .transactions import seed_transactions, undo_transactions

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_wallets()
    seed_stocks()
    seed_assets()
    seed_transactions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_wallets()
    undo_stocks()
    undo_assets()
    undo_transactions()

    # Add other undo functions here
