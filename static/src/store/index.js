import Store from './store.js'

let actions = {
	updateFilter(context, payload) {
		context.commit('updateFilter', payload)
	}
}

let mutations = {
	updateFilter(state, payload) {
		state.filter = payload;
		return state;
	},
};

let d = new Date();

let state = {
	filter: [d.setDate(d.getDate()-30) , d]
};

export default new Store({
	actions,
	mutations,
	state
});