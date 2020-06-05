import Dashboard from "./components/dashboard.js";
import Trend from "./components/trend.js";
import Heatmap from "./components/heatmap.js";
import Filters from "./components/filters.js";
import Report from "./components/report.js";
import Login from "./components/login.js";
import Store from "./store/store.js";
import store from './store/index.js';

import { Dom, createElement, getElement} from "./lib/dom.js";
import { call, fetch } from './lib/request.js'

import "frappe-charts/dist/frappe-charts.min.css";

document.addEventListener('DOMContentLoaded', function() {
	window.nimo = new NimoApp(store)
	nimo.refresh();
});

class NimoApp {
	constructor(store) {
		this.Dom = Dom;
		this.createElement = createElement;
		this.call = call;
		this.store = store;
		this.fetch = fetch;

		this.body = getElement('#app')

		if (this.store instanceof Store) {
			this.store.events.subscribe("session", () => this.refresh());
		}
	}

	refresh() {
		if (this.store.state.session) {
			this.login && this.login.hide();
			this.body.show();

			if (!this.filters) this.filters = new Filters();
			if (!this.dashboard) this.dashboard = new Dashboard();
			if (!this.heatmap) this.heatmap = new Heatmap();
			if (!this.trend) this.trend = new Trend();
			if (!this.report) this.report = new Report();

		} else {
			this.body.hide();
			if (!this.login) {
				this.login = new Login();
			} else {
				this.login.show();
			}
		}
	}
}