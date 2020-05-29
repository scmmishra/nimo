import random
import uuid
from datetime import datetime
from datetime import timedelta

def random_date(start, end):
	"""
	This function will return a random datetime between two datetime
	objects.
	"""
	delta = end - start
	int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
	random_second = random.randrange(int_delta)
	return start + timedelta(seconds=random_second)

def get_uuid():
	return uuid.uuid4().hex

def get_dates_between_range(start_date, end_date):
	return [
		datetime.date.fromordinal(ordinal)
		for ordinal in range(
			start_date.toordinal(),
			end_date.toordinal(),
		)
	]