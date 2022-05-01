"""empty message

Revision ID: e691e130c098
Revises: f101da7b76de
Create Date: 2022-04-30 21:30:28.112690

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e691e130c098'
down_revision = 'f101da7b76de'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('assets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('stock_id', sa.Integer(), nullable=True),
    sa.Column('num_shares', sa.Numeric(precision=8, scale=2), nullable=True),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('assets')
    # ### end Alembic commands ###