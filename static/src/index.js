import DashboardWidget from "./dashboard.js";
import ChartWidget from "./chart.js";
import { Dom, createElement } from "./dom.js"
import { get_browser } from "./utils.js"

import { call } from './request.js'

import "frappe-charts/dist/frappe-charts.min.css";

window.nimo = {};
nimo.Dom = Dom;
nimo.createElement = createElement;
nimo.call = call;
nimo.get_browser = get_browser;


document.addEventListener('DOMContentLoaded', function() {
	nimo.dashboard = new DashboardWidget();
	nimo.chart = new ChartWidget();
});