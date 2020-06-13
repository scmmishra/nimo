import LoginForm from "../components/login.js";

export default class Login {
	constructor(appContainer) {
		this.appContainer = appContainer;
		this.reload();
	}

	reload() {
		this.mount();
		this.login = new LoginForm();
	}

	mount() {
		this.appContainer.empty();
		let body = nimo.createElement(`<div class="container">
			<div id="login" class="my-32"></div>
		</div>`);
		body.append('#app');
	}
}