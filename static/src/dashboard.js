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
		this.dashboard = nimo.createElement(`<div id="dashboard" class="bg-gray-800 rounded shadow-md mt-6 mx-2 p-4 md:p-5">
				<div id="dashboard-container" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 md:pb-0">
					<div class="text-center pt-8 md:py-8">
						<div class="text-pink-500 text-sm uppercase tracking-widest font-semibold">Unique Visitors</div>
						<div id="uniqueVisitors" class="lg:text-7xl md:text-6xl text-5xl text-white font-thin"></div>
					</div>
					<div class="text-center pt-8 md:py-8">
						<div class="text-pink-500 text-sm uppercase tracking-widest font-semibold">Page Views</div>
						<div id="pageViews" class="lg:text-7xl md:text-6xl text-5xl text-white font-thin"></div>
					</div>
					<div class="text-center pt-8 md:py-8">
						<div class="text-pink-500 text-sm uppercase tracking-widest font-semibold">Avg time on site</div>
						<div id="averageTimeOnSite" class="lg:text-7xl md:text-6xl text-5xl text-white font-thin"></div>
					</div>
					<div class="text-center pt-8 md:py-8">
						<div class="text-pink-500 text-sm uppercase tracking-widest font-semibold">Bounce rate</div>
						<div id="bouncRate" class="lg:text-7xl md:text-6xl text-5xl text-white font-thin"></div>
					</div>
				</div>
			</div>`);

		this.dashboard.prepend('#page-container');

		this.stats.uniqueVisitors = this.dashboard.find('#uniqueVisitors');
		this.stats.pageViews = this.dashboard.find('#pageViews');
		this.stats.averageTimeOnSite = this.dashboard.find('#averageTimeOnSite');
		this.stats.bouncRate = this.dashboard.find('#bouncRate');
	}

	render() {
		Object.keys(this.data).forEach(key => {
			this.stats[key].html(this.data[key])
		});
	}
}