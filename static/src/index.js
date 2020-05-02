import DashboardWidget from "./dashboard.js";
import ChartWidget from "./chart.js";
import HeatmapWidget from "./heatmap.js";
import Filters from "./filters.js";
import { Dom, createElement} from "./dom.js"

import { call } from './request.js'

import "frappe-charts/dist/frappe-charts.min.css";

window.nimo = {};
nimo.Dom = Dom;
nimo.createElement = createElement;
nimo.call = call;


document.addEventListener('DOMContentLoaded', function() {
	// nimo.filters = new Filters();
	nimo.dashboard = new DashboardWidget();
	nimo.heatmap = new HeatmapWidget();
	nimo.chart = new ChartWidget();
});