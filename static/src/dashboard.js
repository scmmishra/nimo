import { shortenLargeNumber } from "./utils.js"

export default class DashboardWidget {
	constructor(opts) {
		this.stats = {};
		this.refresh();
	}

	getData() {
		return nimo.call('dashboard')
	}

	refresh() {
		this.getData().then(data => {
			this.data = data;
			this.setup_container();
			this.render();
		});
	}

	setup_container() {
		this.dashboard = nimo.createElement(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Unique Visitors</div>
				<div class="flex items-end justify-between mt-1">
					<span id="uniqueVisitors" class="font-semibold text-2xl -mb-1">3.6 K</span>
					<span class="text-xs mb-1"><span class="text-green-500 font-bold">↑</span> 13%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Total Page Views</div>
				<div class="flex items-end justify-between mt-1">
					<span id="pageViews" class="font-semibold text-2xl -mb-1">23.4 K</span>
					<span class="text-xs mb-1"><span class="text-green-500 font-bold">↑</span> 19%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Avergae Time on Site</div>
				<div class="flex items-end justify-between mt-1">
					<span id="averageTimeOnSite" class="font-semibold text-2xl -mb-1">05:24</span>
					<span class="text-xs mb-1"><span class="text-red-500 font-bold">↓</span> 12%</span>
				</div>
			</div>
			<div class="card rounded py-2 px-4">
				<div class="label text-xs text-gray-800">Bounce Rate</div>
				<div class="flex items-end justify-between mt-1">
					<span id="bouncRate" class="font-semibold text-2xl -mb-1">68%</span>
				</div>
			</div>
		</div>`);

		this.dashboard.append('#statsDashboard');

		this.stats.uniqueVisitors = this.dashboard.find('#uniqueVisitors');
		this.stats.pageViews = this.dashboard.find('#pageViews');
		this.stats.averageTimeOnSite = this.dashboard.find('#averageTimeOnSite');
		this.stats.bouncRate = this.dashboard.find('#bouncRate');
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