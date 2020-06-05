import { toTitleCase } from "../utils.js";
import Component from "./component.js";
import store from "../store/index.js";

export default class Report extends Component {
	constructor(opts) {
		super({ store });

		this.groupBy = "pageviews";
		this.rows = [];
		this.switch = {};

		this.setup_container();
		this.refresh();
	}

	refresh() {
		let filterMap = {
			pageviews: "path",
			referrer: "referrer",
			browser: "browser_name",
		};

		let groupBy = filterMap[this.groupBy];
		return nimo.fetch(`pageviews/${groupBy}`).then((data) => {
			this.counts = data.counts;
			this.render();
		});
	}

	getTitle() {
		return nimo.createElement(`<div id="title" class="flex text-gray-500 font-light uppercase tracking-widest text-xs">
			<span class="w-3/5 py-2 text-left">${toTitleCase(this.groupBy)}</span>
			<span class="w-1/5 py-2 text-right">Views</span>
			<span class="w-1/5 py-2 text-right">Unique</span>
		</div>`);
	}

	getRow(rowData) {
		return nimo.createElement(`<div class="flex relative mb-1 fill fill-76">
			<span id="group" class="w-3/5 py-2">${rowData.group}</span>
			<span id="views" class="w-1/5 py-2 tnum text-right">${rowData.views}</span>
			<span id="unique" class="w-1/5 py-2 tnum text-right">${rowData.unique}</span>
		</div>`);
	}

	setup_container() {
		this.report = nimo.createElement(`<div class="card text-sm text-gray-700">
			<div class="flex justify-between mt-2 mb-4">
				<div id="title" class="label hidden md:block">Website Trends</div>
				<div id="switch" class="flex w-full md:w-auto border border-gray-500 rounded bg-gray-200">
					<div id="pageviews" class="w-1/3 label px-4 py-1 text-xs text-gray-800">PageViews</div>
					<div id="referrer" class="w-1/3 label px-4 py-1 text-xs text-gray-800 cursor-pointer">Referers</div>
					<div id="browser" class="w-1/3 label px-4 py-1 text-xs text-gray-800 cursor-pointer">Browser</div>
				</div>
			</div>
			<div id="report-area">
			</div>
		</div>`);

		this.report.append("#report");
		this.reportArea = this.report.find("#report-area");
		this.switch = {
			pageviews: this.report.find("#pageviews"),
			referrer: this.report.find("#referrer"),
			browser: this.report.find("#browser"),
		};
		this.setupSwitch();
		this.setGroupBy("pageviews", false);
	}

	setupSwitch() {
		Object.keys(this.switch).forEach((key) => {
			this.switch[key].on("click", () => this.setGroupBy(key));
		});
	}

	setGroupBy(key, refresh = true) {
		this.groupBy = key;
		let classMap = {
			pageviews: ["border-r"],
			referrer: ["border-r", "border-l"],
			browser: ["border-l"],
		};

		Object.keys(this.switch).forEach((key) => {
			this.switch[key].removeClass(
				...classMap[key],
				"bg-white",
				"border-gray-500",
				"rounded"
			);
		});

		this.switch[key].addClass(
			...classMap[key],
			"bg-white",
			"border-gray-500",
			"rounded"
		);
		refresh && this.refresh();
	}

	render() {
		this.reportArea.empty();

		this.getTitle().append(this.reportArea);

		this.counts.forEach((rowData) => {
			let row = this.getRow(rowData);
			row.append(this.reportArea);
		});
	}
}
