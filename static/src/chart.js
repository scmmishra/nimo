import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

export default class ChartWidget {
	constructor() {
		this.refresh();
	}

	getData() {
		return {
			labels: ["Apr 10", "Apr 11", "Apr 10", "Apr 9", "Apr 8", "Apr 7", "Apr 6", "Apr 5", "Apr 4", "Apr 3", "Apr 2", "Apr 1", "May 31", "May 30"],
			datasets: [
				{
					name: "Unique Visitors", type: "bar",
					values: [15, 8, 14, 3, 19, 8, 12, 17, 4, 4, 5, 6, 6, 3]
				},
				{
					name: "Page Views", type: "bar",
					values: [39, 25, 50, 10, 15, 18, 32, 27, 14, 14, 25, 36, 22, 17]
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
		this.chart = nimo.createElement(`<div class="bg-white rounded shadow-md mt-6 mx-2 p-4 md:p-5">
			<div class="mt-2">
				<div class="uppercase text-gray-800 tracking-widest font-bold text-sm mb-2">Overview</div>
				<div id="chart" class="-mx-2 md:-mx-5"></div>
			</div>
		</div>`)

		this.chart_wrapper = this.chart.find('#chart')
		this.chart.append('#page-container');
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
			colors: ['#ED64A6', '#FBB6CE']
		})
	}
}