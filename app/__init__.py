import os

from flask import Flask
from flask import g

from config import config

from peewee import *

app = Flask(__name__, static_folder=config.static_folder, static_url_path=config.static_url)
app.secret_key = os.environ.get("SECRET")
app.config.update(
	SESSION_COOKIE_SECURE=True,
	SESSION_COOKIE_HTTPONLY=True,
	SESSION_COOKIE_SAMESITE='Lax',
)

db = SqliteDatabase(config.db_uri, pragmas=config.pragmas)

@app.before_request
def before_request():
	g.db = db
	g.db.connect()

@app.after_request
def after_request(response):
	g.db.close()
	response.headers['X-Frame-Options'] = 'SAMEORIGIN'
	response.headers['X-XSS-Protection'] = '1; mode=block'
	return response

from app import auth, routes, models, commands