export default class Report {
	constructor(opts) {
		this.refresh();
	}

	getData() {
		return {
			columns: [
				{ label: "Referrer", type: "String", width: "3/5" },
				{ label: "Views", type: "Number", width: "1/5" },
				{ label: "Unique", type: "Number", width: "1/5" }
			],
			data: [
				['Google', 132, 85],
				['DuckDuckGo', 67, 58],
				['HackerNews', 121, 73],
			]
		}
	}

	refresh() {
		this.setup_container();
	}

	setup_container() {
		this.report = nimo.createElement(`<div class="card text-sm text-gray-700">
			<div class="flex justify-between mt-2 mb-4">
				<div id="title" class="label">Pages Your Users Visit</div>
				<div id="switch" class="inline-flex border border-gray-500 rounded bg-gray-200">
					<div class="label border-r bg-white border-gray-500 rounded px-4 py-1 text-xs text-gray-800">PageViews</div>
					<div class="label px-4 py-1 text-xs text-gray-800 cursor-pointer">Referers</div>
					<div class="label px-4 py-1 text-xs text-gray-800 cursor-pointer">Location</div>
				</div>
			</div>
			<div id="title" class="flex relative text-gray-500 font-light uppercase tracking-widest text-xs">
				<span class="w-3/5 py-2 text-left">Referer</span>
				<span class="w-1/5 py-2 text-right">Views</span>
				<span class="w-1/5 py-2 text-right">Unique</span>
			</div>
			<div class="flex relative mb-1 fill fill-76">
				<span class="w-3/5 py-2">Google</span>
				<span class="w-1/5 py-2 tnum text-right">132</span>
				<span class="w-1/5 py-2 tnum text-right">85</span>
			</div>
			<div class="flex relative mb-1 fill fill-22">
				<span class="w-3/5 py-2">DuckDuckGo</span>
				<span class="w-1/5 py-2 tnum text-right">67</span>
				<span class="w-1/5 py-2 tnum text-right">58</span>
			</div>
			<div class="flex relative mb-1 fill fill-16">
				<span class="w-3/5 py-2">HackerNews</span>
				<span class="w-1/5 py-2 tnum text-right">118</span>
				<span class="w-1/5 py-2 tnum text-right">75</span>
			</div>
		</div>`);

		this.report.append('#report');
	}
}