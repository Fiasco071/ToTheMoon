# Start with the python:3.9 image
FROM python:3.9
# Set the following enviroment variables
#
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=https://tothemoon-investment-app.herokuapp.com/
# FLASK_APP -> entry point to your flask app
ENV FLASK_APP=app
# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV=production
# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO=True
# Set the directory for upcoming commands to /var/www
WORKDIR /var/www
# Copy all the files from your repo to the working directory
COPY . .
# Copy the built react app (it's built for us) from the
# /react-app/build/ directory into your flasks app/static directory
COPY /react-app/build/* app/static/
# Run the next two python install commands with PIP
# RUN pip install -r requirements.txt
RUN pip install --index-url https://pypi.org/simple
# pip install https://pypi.python.org/simple/ 
RUN pip install alembic==1.6.5
RUN pip install click==7.1.2
RUN pip install flask-cors==3.0.8
RUN pip install flask-login==0.5.0
RUN pip install flask-migrate==3.0.1
RUN pip install flask-sqlalchemy==2.5.1
RUN pip install flask-wtf==0.15.1
RUN pip install flask==2.0.1
RUN pip install greenlet==1.1.0
RUN pip install gunicorn==20.1.0
RUN pip install itsdangerous==2.0.1
RUN pip install jinja2==3.0.1
RUN pip install mako==1.1.4
RUN pip install markupsafe==2.0.1
RUN pip install python-dateutil==2.8.1
RUN pip install python-dotenv==0.14.0
RUN pip install python-editor==1.0.4
RUN pip install six==1.15.0
RUN pip install sqlalchemy==1.4.19
RUN pip install werkzeug==2.0.1
RUN pip install wtforms==2.3.3
RUN pip install psycopg2

# install -r requirements.txt
# install psycopg2

# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn app:app
