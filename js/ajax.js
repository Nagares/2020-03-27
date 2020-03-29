const ajax = {
	get(endpoint) {
		return fetch(endpoint).then(response => response.json());
	},
	post() {},
	put() {},
	delete(endpoint) {
		const options = {
			method: 'DELETE'
		};

		return fetch(endpoint, options).then(response => response.json());
	}
};

export default ajax;