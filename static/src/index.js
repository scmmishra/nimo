import Dashboard from "./dashboard.js";
import Trend from "./trend.js";
import Heatmap from "./heatmap.js";
import Filters from "./filters.js";
import Report from "./report.js";
import { Dom, createElement} from "./utils/dom.js";

import { call } from './utils/request.js'

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