(function(global) {
	let $ = (id => document.getElementById(id));
	const DEFAULT_FONT_SIZE = 16;
	const WEBVIEW_FONT_SIZE = ~~window.getComputedStyle(document.documentElement).fontSize.split("px")[0];
	const FONT_SIZE = WEBVIEW_FONT_SIZE * [DEFAULT_FONT_SIZE/WEBVIEW_FONT_SIZE];
	console.log(FONT_SIZE);
	document.documentElement.style.fontSize = `${FONT_SIZE}px`;
	let urlSavestates = {};
	function load(url, type, args, fetchOptions) {
		return new Promise(async (res) => {
			let a = await fetch(url, fetchOptions);
			let m = await a[type](args);
			res(m);
		});
	}

	const SEARCH_PARAMS = {};
	do {
		let query = window.location.toString().split('?')[1];
		if (typeof query === "undefined") break;
		let keys = [];
		let values = [];

		for (let u of query.split("&")) {
			let q = u.split("=");
			let key = q[0];
			let value = q[1];
			SEARCH_PARAMS[key] = value;
		}
	} while (false);

	console.log(SEARCH_PARAMS);
	
	[...document.getElementsByTagName("JETK-head-button")].forEach(mo => {
		let text = mo.innerText;
		mo.innerHTML = `<JETK-head-buttontext>${text}</JETK-head-buttontext>`;
		mo.addEventListener("click", () => {
			
		});

		function loadURL(url) {

		}
	});
})(window);