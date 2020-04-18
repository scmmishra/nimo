from app import app
from flask import jsonify

@app.route("/api/dashboard")
def get_dashboard_data():
	return jsonify({
		'uniqueVisitors': 38,
		'pageViews': 124,
		'averageTimeOnSite': '05:34',
		'bouncRate': '63%'
	})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
	return app.send_static_file("index.html")