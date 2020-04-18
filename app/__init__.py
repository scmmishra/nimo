import os

from flask import Flask
from config import config
from peewee import *

app = Flask(__name__, static_folder=config.static_folder, static_url_path=config.static_url)
app.debug = True

db = SqliteDatabase(config.db_uri, pragmas=config.pragmas)

from app import routes, models