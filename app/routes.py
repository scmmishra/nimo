from app import app, db
from app.models import PageView, Project, User

from flask import jsonify
from flask import abort
from flask import session
from flask import request
from flask import g

from playhouse.shortcuts import model_to_dict
from box import Box
from peewee import *

import uuid
from datetime import datetime
from datetime import timedelta

@app.route("/api/dashboard", methods=['POST'])
def get_dashboard_data():
	payload = Box(request.get_json())

	query = db.execute_sql("""
				SELECT
					COUNT(uuid) AS count,
					SUM(CASE WHEN is_unique THEN 1 ELSE 0 END) AS unique_count,
					AVG(CAST((JulianDay(modified) - JulianDay(creation)) * 24 * 60 * 60 As Integer))
				FROM pageview
				WHERE creation BETWEEN ? AND ?
			""", (payload.from_date, payload.to_date))

	data = query.fetchall()[0]

	return jsonify({
		'unique': data[1],
		'total': data[0],
		'averageTime': data[2],
		'bounce': '68%'
	})

@app.route('/api/create/project', methods=['POST'])
def create_project():
	payload = Box(request.get_json())
	project = Project.create(
			uuid=uuid.uuid4().hex,
			name=payload.name
		)
	return model_to_dict(project)

@app.route('/api/projects', methods=['GET'])
def get_projects():
	query = Project().select()
	data = [project.uuid for project in query]
	return {'projects': data}


@app.route('/api/pageviews/<project>/<group_by>', methods=['GET'])
def get_pageviews_grouped_by(project, group_by):
	group_by_field = getattr(PageView, group_by)

	query = (PageView.select(group_by_field, fn.Count(PageView.uuid).alias('count'))
				.where(PageView.project_id == project)
				.group_by(group_by_field)).order_by(fn.Count(PageView.uuid).alias('count').desc())

	data = []
	for view in query:
		data.append({
				group_by: getattr(view, group_by),
				'count': view.count
			})

	return { 'data': data, 'count': len(data)}

@app.route('/api/chart', methods=['POST'])
def get_chart_data():
	payload = Box(request.get_json())

	query = db.execute_sql("""
				SELECT
					DATE(creation),
					count(*) AS count,
					SUM(CASE WHEN is_unique THEN 1 ELSE 0 END) AS unique_count
				FROM pageview
				WHERE creation BETWEEN ? AND ?
				GROUP BY DATE(creation)
			""", (payload.from_date, payload.to_date))

	dates = []
	counts = []
	unique = []

	for view in query:
		dates.append(view[0])
		counts.append(view[1])
		unique.append(view[2])

	return { 'dates': dates, 'counts': counts, 'unique': unique }

@app.route('/api/heatmap', methods=['GET', 'POST'])
def get_heatmap_data():
	query = db.execute_sql("""SELECT DATE(creation), count(*) from pageview group by DATE(creation)""")
	data = {}
	for view in query:
		data[datetime.strptime(view[0], '%Y-%m-%d').timestamp()] = view[1]

	return data


@app.route('/api/create/pageview', methods=['POST'])
def create_pageview():
	payload = Box(request.get_json())
	pageview = PageView.create(
			project_id = payload.project_id,
			creation = datetime.now(),
			modified = datetime.now(),
			path = payload.path,
			is_unique = False,
			referrer = payload.referrer,
			browser_name = payload.browser_name,
			browser_version = payload.version
		)
	pageview.save()
	return model_to_dict(pageview)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
	return app.send_static_file("index.html")