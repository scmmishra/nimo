import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

export default class ChartWidget {
	constructor() {
		this.refresh();
	}

	getData() {
		return {
			labels: ["Apr 16", "Apr 15", "Apr 14", "Apr 13", "Apr 12", "Apr 11", "Apr 10", "Apr 9", "Apr 8", "Apr 7", "Apr 6", "Apr 5", "Apr 4", "Apr 3", "Apr 2", "Apr 1", "May 31", "May 30"],
			datasets: [
				{
					name: "Unique Visitors", type: "bar",
					values: [14, 3, 19, 8, 15, 8, 14, 3, 19, 8, 12, 17, 4, 4, 5, 6, 6, 3]
				},
				{
					name: "Page Views", type: "bar",
					values: [10, 15, 18, 32, 39, 25, 50, 10, 15, 18, 32, 27, 14, 14, 25, 36, 22, 17]
				}
			]
		};
	}

	refresh() {
		this.data = this.getData();
		this.setup_container();
		this.render();
	}

	setup_container() {
		this.chart = nimo.createElement(`<div class="card">
			<div class="mt-2">
				<div class="label text-xs text-gray-800 mb-2">Overview</div>
				<div id="chart" class="-mx-2 md:-mx-5"></div>
			</div>
		</div>`)

		this.chart_wrapper = this.chart.find('#chart')
		this.chart.append('#chart');
	}

	render() {
		this.chart = new Chart(this.chart_wrapper.element, {
			data: this.data,
			type: 'bar',
			height: 320,
			barOptions: {
				stacked: true,
				spaceRatio: 0.2,
			},
			axisOptions: {
				xAxisMode: 'tick'
			},
			// colors: ["#234E52", "#4FD1C5"],
			colors: ["#000000", "#757575"],
		})
	}
}