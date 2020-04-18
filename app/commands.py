from app import app
from app.models import PageView
from app.utils import random_date
import random
from datetime import timedelta, datetime

@app.cli.command('create-demo')
def create_demo_data():
	d1 = datetime.strptime('1/1/2020 1:30 PM', '%m/%d/%Y %I:%M %p')
	d2 = datetime.strptime('4/24/2020 4:50 AM', '%m/%d/%Y %I:%M %p')

	routes = ['/', '/blog/v8', '/projects/frappe', '/projects/charts', '/projects/nimo', '/blog/hello']
	referrer = ['https://twitter.com', 'https://duckduckgo.com', 'https://github.com', 'https://google.com']
	broswer = ['Chrome', 'Firefox', 'Opera', 'Safari']

	for ii in range(2000):
		rdate = random_date(d1, d2)
		pageview = PageView.create(
			project_id = 'a5a4c8b467b74de8ae399243a9db6d44',
			creation = rdate,
			modified = rdate + timedelta(seconds=random.randint(100, 900)),
			path = random.choice(routes),
			is_unique = random.choice([True, True, False]),
			referrer = random.choice(referrer),
			browser_name = random.choice(broswer),
			browser_version = '71'
		)
		pageview.save()