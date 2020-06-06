import Dashboard from "./components/dashboard.js";
import Trend from "./components/trend.js";
import Heatmap from "./components/heatmap.js";
import Filters from "./components/filters.js";
import Report from "./components/report.js";
import Login from "./components/login.js";
import AuthManager from "./lib/auth.js"
import store from './store/index.js';

import { Dom, createElement, getElement} from "./lib/dom.js";
import { call, fetch } from './lib/request.js'

import "frappe-charts/dist/frappe-charts.min.css";

document.addEventListener('DOMContentLoaded', function() {
	window.nimo = new NimoApp(store)
	nimo.reload();
});

class NimoApp {
	constructor(store) {
		this.Dom = Dom;
		this.createElement = createElement;
		this.call = call;
		this.store = store;
		this.fetch = fetch;
		this.appContainer = getElement('#app');
		this.authManager = new AuthManager();

		// Subscribe to Session Changes
		this.store.events.subscribe("session", () => this.reload());
	}

	reload() {
		this.setupBody();
		if (this.store.state.session) {
			this.filters = new Filters();
			this.dashboard = new Dashboard();
			this.heatmap = new Heatmap();
			this.trend = new Trend();
			this.report = new Report();
		} else {
			this.login = new Login();
		}
	}

	setupBody() {
		this.appContainer.empty();
		let body = this.createElement(`<div class="container">
			<div id="filterArea" class="my-6"></div>
			<div id="statsDashboard" class="my-6"></div>
			<div id="heatmap" class="my-6"></div>
			<div id="chart" class="my-6"></div>
			<div id="report" class="my-6"></div>
			<div id="login" class="my-32"></div>
		</div>`);
		body.append('#app');
	}
}