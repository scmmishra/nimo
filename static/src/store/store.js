import PubSub from "../lib/pubsub.js";

export default class Store {
	constructor(params) {
		let self = this;

		this.actions = {};
		this.mutations = {};
		this.state = {};
		this.status = "resting";
		this.events = new PubSub();

		if (params.hasOwnProperty("actions")) {
			this.actions = params.actions;
		}

		if (params.hasOwnProperty("mutations")) {
			this.mutations = params.mutations;
		}

		this.state = new Proxy(params.state || {}, {
			set: function(state, key, value) {
				state[key] = value;

				console.log(`stateChange: ${key}: ${value}`);
				self.events.publish(key, self.state);

				if (self.status !== "mutation") {
					console.warn(`You should use a mutation to set ${key}`);
				}

				self.status = "resting";

				return true;
			},
		});
	}

	dispatch(actionKey, payload) {
		if (typeof this.actions[actionKey] !== "function") {
			console.error(`Action "${actionKey} doesn't exist.`);
			return false;
		}

		console.groupCollapsed(`ACTION: ${actionKey}`);

		this.status = "action";

		this.actions[actionKey](this, payload);

		console.groupEnd();

		return true;
	}

	commit(mutationKey, payload) {
		if (typeof this.mutations[mutationKey] !== "function") {
			console.log(`Mutation "${mutationKey}" doesn't exist`);
			return false;
		}

		this.status = "mutation";

		let newState = this.mutations[mutationKey](this.state, payload);

		this.state = Object.assign(this.state, newState);

		return true;
	}
}
