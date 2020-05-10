import Store from "../store/store.js";

export default class Component {
	constructor(props = {}) {

		this.refresh = this.refresh || function() {};

		if (props.store instanceof Store) {
			props.store.events.subscribe("stateChange", () => this.refresh());
		}
	}
}
