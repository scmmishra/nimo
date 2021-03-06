import { shortenLargeNumber, fmtMSS } from "../utils.js"
import Component from './component.js';
import store from '../store/index.js';

export default class Dashboard extends Component {
	constructor(opts) {
		super({ store })

		this.stats = {};
		this.setup_container();

		this.refresh();
	}

	getData() {
		return nimo.fetch('dashboard')
	}

	refresh() {
		this.getData().then(data => {
			this.data = data;
			this.data.averageTime = fmtMSS(this.data.averageTime)
			this.render();
		});
	}

	setup_container() {
		this.body = nimo.createElement(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Unique Visitors</div>
				<div class="flex items-end justify-between mt-1">
					<span id="unique" class="font-semibold text-2xl -mb-1"></span>
					<span class="text-xs mb-1"><span class="text-green-500 font-bold">↑</span> 13%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Total Page Views</div>
				<div class="flex items-end justify-between mt-1">
					<span id="total" class="font-semibold text-2xl -mb-1"></span>
					<span class="text-xs mb-1"><span class="text-green-500 font-bold">↑</span> 19%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Avergae Time on Site</div>
				<div class="flex items-end justify-between mt-1">
					<span id="averageTime" class="font-semibold text-2xl -mb-1"></span>
					<span class="text-xs mb-1"><span class="text-red-500 font-bold">↓</span> 12%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Bounce Rate</div>
				<div class="flex items-end justify-between mt-1">
					<span id="bounce" class="font-semibold text-2xl -mb-1"></span>
				</div>
			</div>
		</div>`);

		this.stats.unique = this.body.find('#unique');
		this.stats.total = this.body.find('#total');
		this.stats.averageTime = this.body.find('#averageTime');
		this.stats.bounce = this.body.find('#bounce');

		this.body.append('#statsDashboard');
	}

	render() {
		Object.keys(this.data).forEach(key => {
			let value = this.data[key];
			if (typeof value === "number") {
				value = shortenLargeNumber(value);
			}
			this.stats[key].html(value)
		});
	}
}