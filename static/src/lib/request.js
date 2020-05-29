// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import store from '../store/index.js';

export function call(endpoint, { body, ...customConfig } = {}) {
	const headers = { "Content-Type": "application/json" };

	body = {
		from_date: store.state.filter[0].format('YYYY-MM-DD HH:mm:ss'),
		to_date: store.state.filter[1].format('YYYY-MM-DD HH:mm:ss'),
		...body
	}

	const config = {
		method: body ? "POST" : "GET",
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	};

	if (body) {
		config.body = JSON.stringify(body);
	}

	return window
		.fetch(`/api/${endpoint}`, config)
		.then(async (response) => {
			const data = await response.json();

			if (response.ok) {
				return data;
			} else {
				return Promise.reject(data);
			}
		});
}