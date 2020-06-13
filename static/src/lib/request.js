// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
export function fetch(endpoint, { body, ...customConfig } = {}) {
	body = {
		from_date: nimo.store.state.filter[0].format('YYYY-MM-DD HH:mm:ss'),
		to_date: nimo.store.state.filter[1].format('YYYY-MM-DD HH:mm:ss'),
		...body
	}

	return call(endpoint, { body, ...customConfig })
}

export function call(endpoint, { body, ...customConfig } = {}) {
	const headers = { "Content-Type": "application/json" };

	if (nimo.authManager.token) {
		headers["Authorization"] = `Bearer ${nimo.authManager.token}`
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
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				console.log(response.status, response.statusText)
				if (response.status == 401) {
					nimo.navigate('login')
					return
				}
				return Promise.reject();
			}
		});
}