
import AuthManager from "./lib/auth.js"
import store from './store/index.js';
import routes from './routes.js'

import { Dom, createElement, getElement} from "./lib/dom.js";
import { call, fetch } from './lib/request.js'

import "frappe-charts/dist/frappe-charts.min.css";

document.addEventListener('DOMContentLoaded', function() {
	window.nimo = new NimoApp(store, routes);
	
	const route = () => {
		const current_route = window.location.hash.replace('#', '')
		let routeObj = routes[current_route];
		this.currentPage = new routeObj.page(nimo.appContainer);
	}

	window.addEventListener('hashchange', route);
	window.addEventListener('load', route);
});

class NimoApp {
	constructor(store, routes) {
		this.Dom = Dom;
		this.createElement = createElement;
		this.call = call;
		this.store = store;
		this.fetch = fetch;
		this.routes = routes;
		this.appContainer = getElement('#app');
		this.authManager = new AuthManager();
	}

	route() {
		const current_route = window.location.hash.replace('#', '')
		let routeObj = this.routes[current_route];
		this.currentPage = new routeObj.page(this.appContainer);
	}

	navigate(page) {
		if (Object.keys(this.routes).includes(page)) {
			page = '#' + page
		} else {
			page = '#desk'
		}

		window.location.hash = page;
		nimo.route();
	}
}