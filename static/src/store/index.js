import Store from './store.js'
import dayjs from 'dayjs';

let actions = {
	updateFilter(context, payload) {
		context.commit('updateFilter', payload)
	}
}

let mutations = {
	updateFilter(state, payload) {
		state.filter = payload;
		return state;
	}
};

let today = dayjs();

let state = {
	filter: [today.subtract(29, 'day'), today]
};

export default new Store({
	actions,
	mutations,
	state
});