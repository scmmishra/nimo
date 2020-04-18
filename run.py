from app import app, db
from app.models import PageView, Project

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'PageView': PageView, 'Project': Project}

def create_tables():
	with db:
		db.create_tables([Project, PageView])

create_tables()