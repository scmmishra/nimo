// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export function call(endpoint, { body, ...customConfig } = {}) {
	const headers = { "Content-Type": "application/json" };

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