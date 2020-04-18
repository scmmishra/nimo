import os
from box import Box

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

config = Box({
	'db_uri': os.path.join(BASE_DIR, 'app.db'),
	'static_folder': os.path.join(BASE_DIR, 'static', 'public'),
	'static_url': "/",
	'pragmas': {
		'journal_mode': 'wal',
		'cache_size': -1 * 64000,  # 64MB
		'foreign_keys': 1,
		'ignore_check_constraints': 0,
		'synchronous': 0
	}
})