import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import dayjs from 'dayjs';

export default class Heatmap {
	constructor() {
		this.refresh();
	}

	getData() {
		return nimo.fetch('heatmap')
	}

	refresh() {
		this.data = this.getData().then(data => {
			this.data = data
			this.setup_container();
			this.render();
		});
	}

	setup_container() {
		this.chart = nimo.createElement(`<div class="card mt-2 align-center">
				<div id="heatmap" class="flex lg:-ml-5 justify-center overflow-auto"></div>
		</div>`)

		this.chart_wrapper = this.chart.find('#heatmap')
		this.stats_wrapper = this.chart.find('#stats')
		this.chart.append('#heatmap');
	}

	render() {
		let today = dayjs();
		let lastYear = dayjs().subtract(1, 'year')
		this.chart = new Chart(this.chart_wrapper.element, {
			data: {
				dataPoints: this.data,
				start: lastYear.$d,
				end: today.$d,
			},
			axisOptions: {
				xIsSeries: true,
			},
			width: '400px',
			type: 'heatmap',
			radius: 3,
			countLabel: 'Views',
			colors: ["#CBD5E0", "#C6F6D5", "#9AE6B4", "#48BB78", "#2F855A"]
		})
	}
}