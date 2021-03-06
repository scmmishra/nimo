import store from '../store/index.js';
import dayjs from 'dayjs';

export default class Filters {
	constructor(options = {}) {
		this.refresh();
	}

	refresh() {
		this.setup_container();
	}

	getOptions() {
		let today = dayjs();

		return [
			{ label: "Today", values: [today.startOf('day'), today.endOf('day')] },
			{ label: "sectionBreak" },
			{ label: "Last 7 Days", values: [today.subtract(6, 'day'), today] },
			{ label: "Last 30 Days", values: [today.subtract(29, 'day'), today] },
			{ label: "Last 60 Days", values: [today.subtract(59, 'day'), today] },
			{ label: "sectionBreak" },
			{ label: "Last 6 Months", values: [today.subtract(6, 'month'), today] },
			{ label: "Last 12 Months", values: [today.subtract(12, 'month'), today] },
			{ label: "sectionBreak" },
			{ label: "Custom Range", values: [today.subtract(12, 'month'), today] },
		]
	}

	setup_container() {
		this.body = nimo.createElement(`<div class="flex flex-col md:flex-row md:justify-between md:items-center">
			<div class="text-lg label text-gray-800">
				Analytics for <b class="text-black">Frappe.io</b>
			</div>
			<div class="flex">
				<div class="relative mt-2 w-full md:w-56 md:mt-0">
					<div id="dropdownButton" class="flex items-center justify-between card leading-tight cursor-pointer text-sm font-medium text-gray-800 h-full w-full">
						<span id="currentFilter" class="mr-2">Last 30 Days</span>
						<svg class="text-gray-700" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
					</div>
					<div id="dropdown" class="absolute mt-2 rounded shadow-md z-10 hidden" style="width: 236px; right: 0px;">
						<div id="dropdownArea" class="border border-gray-400 rounded bg-white font-medium text-gray-800 py-1">
						</div>
					</div>
				</div>
				<div class="relative ml-2 hidden w-full w-full md:w-64">
					<div id="datepicker" class="flex items-center justify-between card leading-tight cursor-pointer text-sm font-medium text-gray-800 h-full">
						<span id="date-range" class="mr-2">Jun 30 - May 1</span>
						<svg class="text-gray-700" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
					</div>
				</div>
			</div>
		</div>`);

		let itemClass = "cursor-pointer block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900";


		let dropdown = this.body.find("#dropdown");
		let dropdownArea = this.body.find("#dropdownArea");
		let currentFilter = this.body.find("#currentFilter");
		let dropdownButton = this.body.find("#dropdownButton");

		this.getOptions().forEach(opt => {
			if (opt.label == "sectionBreak") {
				nimo.createElement(`<div class="border-t border-gray-400 my-1"></div>`).append(dropdownArea);
			} else {
				let item = nimo.createElement(`<span class="cursor-pointer block px-4 py-2 text-sm leading-tight hover:bg-gray-100 hover:text-gray-900">${opt.label}</span>`)

				item.on('click', () => {
					store.dispatch('updateFilter', opt.values);
					currentFilter.html(opt.label);
					dropdown.toggleClass("hidden");
				})

				item.append(dropdownArea)
			}
		})

		dropdownButton.on('click', () => {
			dropdown.toggleClass("hidden");
		})

		this.body.append("#filterArea");
	}

	hide() {
		this.body.hide();
	}

	show() {
		this.body.show();
	}
}