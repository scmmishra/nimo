export function getBrowser() {
	var ua = navigator.userAgent,
		tem,
		M =
			ua.match(
				/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
			) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return { name: "IE", version: tem[1] || "" };
	}
	if (M[1] === "Chrome") {
		tem = ua.match(/\bOPR|Edge\/(\d+)/);
		if (tem != null) {
			return { name: "Opera", version: tem[1] };
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return {
		name: M[0],
		version: M[1],
	};
}

export function shortenLargeNumber(label) {
	let number;
	if (typeof label === 'number') number = label;
	else if (typeof label === 'string') {
		number = Number(label);
		if (Number.isNaN(number)) return label;
	}

	// Using absolute since log wont work for negative numbers
	let p = Math.floor(Math.log10(Math.abs(number)));
	if (p <= 2) return number; // Return as is for a 3 digit number of less
	let	l = Math.floor(p / 3);
	let shortened = (Math.pow(10, p - l * 3) * +(number / Math.pow(10, p)).toFixed(1));

	// Correct for floating point error upto 2 decimal places
	return Math.round(shortened*100)/100 + ' ' + ['', 'K', 'M', 'B', 'T'][l];
}

export function fmtMSS(time) {
	return Math.floor(time / 60)+':'+Math.floor(time % 60);
}

export function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}