export default class Login {
	constructor(opts) {
		this.setup_container();
		this.refresh();
	}

	getData() { }

	refresh() {
		this.setupEvents();
	}

	setup_container() {
		this.body = nimo.createElement(`<div class="max-w-sm mx-auto card rounded py-2 px-4">
			<div class="label text-xs text-gray-800 my-2">Login</div>
			<div class="my-2">
				<input id="email" class="w-full py-2 px-4 rounded bg-gray-200 text-gray-700 my-2 text-sm" type="text" placeholder="vijay@hero.com">
				<input id="password" class="w-full py-2 px-4 rounded bg-gray-200 text-gray-700 my-2 text-sm" type="password" placeholder="***********">
				<button id="loginButton" class="w-full py-2 px-4 mt-4 label text-xs text-white rounded bg-black">Login</button>
			</div>
		</div>`);

		this.body.append("#login");
		this.loginButton = this.body.find('#loginButton');
		this.email = this.body.find("#email");
		this.password = this.body.find("#password");
	}

	render() { }

	setupEvents() {
		this.loginButton.on('click', () => {
			nimo.authManager.login(this.email.value(), this.password.value())
				.catch(() => {
					console.log("Scam")
				})
		})
	}

	hide() {
		this.body.hide();
	}

	show() {
		this.body.show();
	}
}
