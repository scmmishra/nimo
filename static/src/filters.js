export default class Filters {
	constructor() {
		this.refresh();
	}

	refresh() {
		this.setup_container();
	}

	setup_container() {
		this.filters = nimo.createElement(`<div class="flex justify-between mx-2">
			<div class="inline-flex mr-2">
				<button class="bg-gray-300 hover:bg-gray-400 text-pink-600 text-sm font-bold py-2 px-4 rounded-l">
					2W
				</button>
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-bold py-2 px-4">
					4W
				</button>
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-bold py-2 px-4">
					MTH
				</button>
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-bold py-2 px-4">
					QTR
				</button>
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-bold py-2 px-4 rounded-r">
					ALL
				</button>
			</div>
			<div>
				<div class="relative" style="height: 35.5px; width: 190px;">
					<div id="dropdownButton" class="flex items-center justify-between rounded bg-white shadow px-4 pr-3 py-2 leading-tight cursor-pointer text-sm font-medium text-gray-800 h-full">
						<span id="dropdownCurrentFilter" class="mr-2">Last 30 days</span>
						<svg class="text-pink-500 fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><use xlink:href="#feather-chevron-down"></use></svg>
					</div>
					<div id="dropdown" class="absolute mt-2 rounded shadow-md z-10 hidden" style="width: 235px; right: -14px;">
						<div class="rounded bg-white shadow-xs font-medium text-gray-800">
							<div class="py-1">
								<a class=" block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Today</a>
							</div>
							<div class="border-t border-gray-200"></div>
							<div class="py-1">
								<a class=" block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Last 7 days</a>
								<a class="font-bold block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Last 30 days</a>
								<a class=" block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Last 60 days</a>
							</div>
							<div class="border-t border-gray-200"></div>
							<div class="py-1">
								<a class=" block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Last 6 months</a>
								<a class=" block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">Last 12 months</a>
							</div>
							<div class="border-t border-gray-200"></div>
							<div class="py-1">
								<span class="block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Custom range</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`);

		this.filters.prepend("#filter-area");
		let dropdown = this.filters.find("#dropdown");
		let currentFilter = this.filters.find("#currentFilter");
		let dropdownButton = this.filters.find("#dropdownButton");

		dropdownButton.on('click', () => {
			dropdown.toggleClass("hidden");
		})
	}
}
