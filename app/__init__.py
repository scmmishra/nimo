import os

from flask import Flask
from flask import g

from flask_jwt_extended import JWTManager

from config import config

from peewee import *

app = Flask(__name__, static_folder=config.static_folder, static_url_path=config.static_url)
app.config['JWT_SECRET_KEY'] = os.environ.get("SECRET")

jwt = JWTManager(app)

db = SqliteDatabase(config.db_uri, pragmas=config.pragmas)

@app.before_request
def before_request():
	g.db = db
	g.db.connect()

@app.after_request
def after_request(response):
	g.db.close()
	return response

from app import auth, routes, models, commands