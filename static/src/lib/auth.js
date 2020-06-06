import store from '../store/index.js';

export default class AuthManager {
	constructor() {
		this.session = {};
		this.token;
	}

	login(email, password) {
		return nimo.call('login', {
			body: {
				email: email,
				password: password
			}
		}).then(data => {
			this.token = data.access_token;
			this.session.user = email;
			store.dispatch('updateSession', this.session);
		})
	}

	logout() {
		if (this.token && nimo.store.state.session) {
			this.token = null;
			store.dispatch('updateSession', false);
		}
	}
}