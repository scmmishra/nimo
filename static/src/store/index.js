import Store from './store.js'
import dayjs from 'dayjs';

let actions = {
	updateFilter(context, payload) {
		context.commit('updateFilter', payload)
	},

	updateSession(context, payload) {
		context.commit('updateSession', payload)
	},
}

let mutations = {
	updateFilter(state, payload) {
		state.filter = payload;
		return {'filter': payload};
	},

	updateSession(state, payload) {
		state.session = payload;
		return {'session': payload};
	}
};

let today = dayjs();

let state = {
	filter: [today.subtract(29, 'day'), today],
	session: false
};

export default new Store({
	actions,
	mutations,
	state
});