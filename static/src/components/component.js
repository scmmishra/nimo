import Store from "../store/store.js";

export default class Component {
	constructor(props = {}) {

		this.refresh = this.refresh || function() {};

		if (props.store instanceof Store) {
			props.store.events.subscribe("filter", () => {
				this.refresh()
			});
		}
	}

	hide() {
		return this.body.hide();
	}

	show() {
		return this.body.show();
	}
}
