import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import Component from './component.js';
import store from '../store/index.js';
import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

export default class Trend extends Component {
	constructor(opts) {
		super({ store })

		this.setup_container();
		this.refresh();
	}

	getData() {
		return nimo.fetch('chart')
	}

	refresh() {
		this.getData().then(data => {
			let dates = data.dates.map(date => dayjs(date, "YYYY-MM-DD").format('LL'));

			this.data = {
				labels: dates,
				datasets: [
					{
						name: "Unique Visitors", type: "bar",
						values: data.unique
					},
					{
						name: "Page Views", type: "bar",
						values: data.counts
					}
				]
			};

			this.render();
		});
	}

	setup_container() {
		this.chart = nimo.createElement(`<div class="card">
				<div class="label text-xs text-gray-800 my-2">Overview</div>
				<div id="chart" class="-mx-2 md:-mx-5"></div>
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
				xAxisMode: 'tick',
				xIsSeries: true
			},
			colors: ["#2F855A", "#48BB78"],
		})
	}
}