"""empty message

Revision ID: f101da7b76de
Revises: 9009b251aeae
Create Date: 2022-04-30 20:44:43.894916

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f101da7b76de'
down_revision = '9009b251aeae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticker', sa.String(length=6), nullable=True),
    sa.Column('long_name', sa.String(length=50), nullable=True),
    sa.Column('i_price', sa.Numeric(precision=8, scale=2), nullable=True),
    sa.Column('info1', sa.String(length=255), nullable=True),
    sa.Column('info2', sa.String(length=255), nullable=True),
    sa.Column('info3', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('stocks')
    # ### end Alembic commands ###