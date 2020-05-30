from app import db
from peewee import *
from datetime import datetime

class BaseModel(Model):
	class Meta:
		database = db

class Project(BaseModel):
	uuid = CharField(primary_key=True)
	name = CharField(null=False)

class PageView(BaseModel):
	uuid = BigAutoField(primary_key=True)
	project_id = ForeignKeyField(Project, null=False)
	path = TextField(index=True, null=False)
	referrer = CharField(index=True)
	is_unique = BooleanField(index=True)
	timezone = CharField()
	browser_name = CharField()
	browser_version = CharField()
	creation = DateTimeField(default=datetime.utcnow(), index=True, null = False)
	modified = DateTimeField(index=True, null = False)

class User(BaseModel):
	email = CharField(primary_key=True)
	name = CharField(null = False)
	password = CharField()