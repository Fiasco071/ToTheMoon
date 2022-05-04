"""empty message

Revision ID: 24111549c651
Revises: 9ef6d13b9695
Create Date: 2022-05-04 15:19:35.796161

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24111549c651'
down_revision = '9ef6d13b9695'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('association',
    sa.Column('left_id', sa.Integer(), nullable=False),
    sa.Column('right_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['left_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['right_id'], ['assets.id'], ),
    sa.PrimaryKeyConstraint('left_id', 'right_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('association')
    # ### end Alembic commands ###