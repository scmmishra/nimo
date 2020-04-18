import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import dayjs from 'dayjs';

export default class HeatmapWidget {
	constructor() {
		this.refresh();
	}

	getData() {
		return nimo.call('heatmap')
	}

	refresh() {
		this.data = this.getData().then(data => {
			this.data = data
			this.setup_container();
			this.render();
		});
	}

	setup_container() {
		this.chart = nimo.createElement(`<div class="bg-gray-800 rounded shadow-md mt-6 mx-2 p-4 md:p-5">
			<div class="mt-2">
				<div class="uppercase text-pink-500 tracking-widest font-bold text-sm mb-2">Dashboard</div>
				<div id="heatmap" class="self-center -mx-2 md:-mx-5"></div>
			</div>
		</div>`)

		this.chart_wrapper = this.chart.find('#heatmap')
		this.stats_wrapper = this.chart.find('#stats')
		this.chart.prepend('#page-container');
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
			width: '400px',
			type: 'heatmap',
			colors: ['#EDF2F7', '#E2E8F0', '#CBD5E0', '#A0AEC0', '#4A5568']
		})
	}
}