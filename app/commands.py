from app import app, db
from app.models import PageView, Project
from app.utils import random_date, get_uuid
import random
from datetime import timedelta, datetime

@app.cli.command('create-demo')
def create_demo_data():
	with db:
		print("Creating DB")
		db.create_tables([Project, PageView])

	uuid = get_uuid()
	project_name = "getnimo.app"

	print("Creating Project:")
	print("\tProject Name: {0}".format(project_name))
	print("\tProject ID: {0}".format(uuid))

	project = Project.create(
			uuid=uuid,
			name=project_name
		)
	project.save()

	d1 = datetime.strptime('1/1/2019 1:30 PM', '%m/%d/%Y %I:%M %p')
	d2 = datetime.strptime('6/1/2020 4:50 AM', '%m/%d/%Y %I:%M %p')

	routes = ['/', '/', '/', '/', '/blog/v8', '/projects/frappe', '/projects/charts', '/projects/nimo', '/blog/hello']
	referrer = ['https://twitter.com', 'https://duckduckgo.com', 'https://github.com', 'https://google.com', 'https://google.com', 'https://google.com']
	broswer = ['Chrome', 'Chrome', 'Chrome', 'Chrome', 'Firefox', 'Opera', 'Safari']
	timezones = ['Asia/Kolkata', 'Asia/Kolkata', 'Asia/Kolkata', 'Europe/London', 'America/Chicago', 'America/New_York', 'Pacific/Honolulu', 'America/Denver', 'Europe/Istanbul']

	print("Creating 15000 Entries")

	for ii in range(15000):
		rdate = random_date(d1, d2)
		pageview = PageView.create(
			project_id = uuid,
			creation = rdate,
			modified = rdate + timedelta(seconds=random.randint(100, 900)),
			path = random.choice(routes),
			is_unique = random.choice([True, True, False]),
			referrer = random.choice(referrer),
			timezone = random.choice(timezones),
			browser_name = random.choice(broswer),
			browser_version = '71'
		)
		pageview.save()

	print("Demo Data Created")
	print("Go Make Some Noise!")