from app import app, db
from app.models import User

from flask import jsonify
from flask import abort
from flask import session
from flask import request
from flask import g
from flask import redirect

from box import Box
import hashlib, binascii, os
import functools

@app.route('/api/login', methods=['POST'])
def login():
	payload = Box(request.get_json())

	try:
		email = payload.email
		password = payload.password

		user = User.get_by_id(email)
	except Exception:
		return jsonify({"msg": "Bad username or password"}), 401

	if verify_password(user.password, password):
		session['logged_in'] = True
		session.permanent = True
		return jsonify(status="success"), 200
	return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/logout', methods=['GET'])
def logout():
    session.clear()
    return jsonify(status="success"), 200

def get_user(email):
	try:
		user = User.get_by_id(email)
		return user
	except User.DoesNotExist:
		return None

def register(email, name, password):
	if get_user(email):
		return jsonify({"msg": "User already registered"}), 403

	password = hash_password(password)

	user = User.create(
			email=email,
			name=name,
			password=password
		)
	return jsonify({"msg": "User registered successfully"}), 200

def hash_password(password):
	"""Hash a password for storing."""
	salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
	pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
								salt, 100000)
	pwdhash = binascii.hexlify(pwdhash)
	return (salt + pwdhash).decode('ascii')

def verify_password(stored_password, provided_password):
	"""Verify a stored password against one provided by user"""
	salt = stored_password[:64]
	stored_password = stored_password[64:]
	pwdhash = hashlib.pbkdf2_hmac('sha512',
								  provided_password.encode('utf-8'),
								  salt.encode('ascii'),
								  100000)
	pwdhash = binascii.hexlify(pwdhash).decode('ascii')
	return pwdhash == stored_password

def login_required(fn):
	@functools.wraps(fn)
	def inner(*args, **kwargs):
		if session.get('logged_in'):
			return fn(*args, **kwargs)
		return jsonify({"msg": "Not Logged In"}), 401
	return inner