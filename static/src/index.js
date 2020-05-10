import Dashboard from "./components/dashboard.js";
import Trend from "./components/trend.js";
import Heatmap from "./components/heatmap.js";
import Filters from "./components/filters.js";
import Report from "./components/report.js";

import { Dom, createElement} from "./lib/dom.js";
import { call } from './lib/request.js'

import "frappe-charts/dist/frappe-charts.min.css";

window.nimo = {};
nimo.Dom = Dom;
nimo.createElement = createElement;
nimo.call = call;


document.addEventListener('DOMContentLoaded', function() {
	nimo.filters = new Filters();
	nimo.dashboard = new Dashboard();
	nimo.heatmap = new Heatmap();
	nimo.trend = new Trend();
	nimo.report = new Report();
});