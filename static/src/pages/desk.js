import Dashboard from "../components/dashboard.js";
import Trend from "../components/trend.js";
import Heatmap from "../components/heatmap.js";
import Filters from "../components/filters.js";
import Report from "../components/report.js";

export default class Desk {
	constructor(appContainer) {
		this.appContainer = appContainer;
		this.reload();
	}

	reload() {
		this.mount();
		this.filters = new Filters();
		this.dashboard = new Dashboard();
		this.heatmap = new Heatmap();
		this.trend = new Trend();
		this.report = new Report();
	}

	mount() {
		this.appContainer.empty();
		let body = nimo.createElement(`<div class="container">
			<div id="filterArea" class="my-6"></div>
			<div id="statsDashboard" class="my-6"></div>
			<div id="heatmap" class="my-6"></div>
			<div id="chart" class="my-6"></div>
			<div id="report" class="my-6"></div>
		</div>`);
		body.append('#app');
	}

	hide() {
		this.body.hide()
	}
}