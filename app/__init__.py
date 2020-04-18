import os

from flask import Flask
from flask import g

from config import config

from peewee import *

app = Flask(__name__, static_folder=config.static_folder, static_url_path=config.static_url)
app.debug = True

db = SqliteDatabase(config.db_uri, pragmas=config.pragmas)

@app.before_request
def before_request():
	g.db = db
	g.db.connect()

@app.after_request
def after_request(response):
	g.db.close()
	return response

from app import routes, models, commands