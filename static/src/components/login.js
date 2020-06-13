export default class LoginForm {
	constructor(opts) {
		this.setup_container();
		this.artWork = ['ʘ‿ʘ', 'ʕ•ᴥ•ʔ', 'ʕᵔᴥᵔʔ', '¯\\_(ツ)_/¯', 'ヽ(´▽`)/', 'ヽ(´ー｀)ノ', '(⊙.☉)7', '♪♪ ヽ(ˇ∀ˇ )ゞ', '(ᵔᴥᵔ)', '(◠﹏◠)', '(っ▀¯▀)つ', 'ヽ( •_)ᕗ', '~(^-^)~', '\(ᵔᵕᵔ)/', 'ฅ^•ﻌ•^ฅ', '（ ^_^）o自自o（^_^ ）', 'ᕙ(⇀‸↼‶)ᕗ', 'ᕦ(ò_óˇ)ᕤ', '(づ￣ ³￣)づ', '♥‿♥', 'ʕ •́؈•̀ ₎', 'ʕ •́؈•̀)', '[¬º-°]¬', '(҂◡_◡) ', 'ᕕ( ᐛ )ᕗ', '( ˘ ³˘)']
		this.refresh();
	}

	getData() { }

	refresh() {
		this.setupEvents();
		this.render();
	}

	setup_container() {
		this.body = nimo.createElement(`<div class="mx-auto">
			<div class="max-w-sm mx-auto card rounded py-2 px-4">
				<div class="label text-xs text-gray-800 my-2">Login</div>
				<div class="my-2">
					<input id="email" class="w-full py-2 px-4 rounded bg-gray-200 text-gray-700 my-2 text-sm" type="text" placeholder="vijay@hero.com">
					<input id="password" class="w-full py-2 px-4 rounded bg-gray-200 text-gray-700 my-2 text-sm" type="password" placeholder="***********">
					<button id="loginButton" class="w-full py-2 px-4 mt-4 label text-xs text-white rounded bg-black">Login</button>
				</div>
			</div>
			<div class="mt-5 text-gray-500 text-center" id="leonardo"></div>
		</div>`);

		this.loginButton = this.body.find('#loginButton');
		this.email = this.body.find("#email");
		this.password = this.body.find("#password");
		this.leonardo = this.body.find("#leonardo");
	}

	render() {
		this.body.append("#login");
		this.leonardo.html(this.artWork[Math.floor(Math.random() * this.artWork.length)])
	}

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
