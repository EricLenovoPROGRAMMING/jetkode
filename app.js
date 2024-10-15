(function (global) {
	let $ = (id => document.getElementById(id));
	const DEFAULT_FONT_SIZE = 16;
	const WEBVIEW_FONT_SIZE = ~~window.getComputedStyle(document.documentElement).fontSize.split("px")[0];
	const FONT_SIZE = WEBVIEW_FONT_SIZE * [DEFAULT_FONT_SIZE / WEBVIEW_FONT_SIZE];
	console.log(FONT_SIZE);
	document.documentElement.style.fontSize = `${FONT_SIZE}px`;
	let urlSavestates = {};
	let load = ((_directory, respType) => {
		////console.log(_directory)
		let dir = _directory;
		/*
  let dot = dir.split(".");
 		let extIndex = dot.length - 1;
 		let ext = dot[extIndex];
 		let ld = dir.split("./");
 		let fullDir = (`${BASE_DIRECTORY.replace("./", "html/")}/${ld[ld.length - 1]}`);
 		//console.log((fullDir.replace(new RegExp("//", "gm"), "/")));
 		*/


		let _d = _directory.split("./");

		////console.log(ext)

		////console.log(`${BASE_DIRECTORY.replace("./", "html/")}/${_d[_d.length - 1]}`);


		let directory = (`./${_d[_d.length - 1]}`).replace(new RegExp("//", "gm"), "/");
		return new Promise((res, rej) => {
			let xhr = new XMLHttpRequest();
			xhr.timeout = 20000;
			xhr.responseType = "arraybuffer";

			xhr.onreadystatechange = async (event) => {
				
				if (event.target.readyState === 4 && event.target.status === 403) {
					//console.error("403: EricLenovo System does not find a file: forbidden or there's an error encountered during the loading of a file.")
					//rej("403: EricLenovo System does not find a file: forbidden or there's an error encountered during the loading of a file.");
					let retry = await __fetch(_directory, respType);
					res(retry);
					return;
				};

				if (event.target.readyState === 4 && event.target.status === 200) {
					////console.log(xhr.response)
					var uint8Array = new Uint8Array(xhr.response);
					var i = uint8Array.length;
					let binaryString = new TextDecoder().decode(uint8Array);

					var base64 = binaryString; //.join('');/**/
					/*let binaryString = xhr.response
					let uint8Array = new Uint8Array(xhr.response.length);
					for (let o = 0; o < xhr.response.length; o++) {
						uint8Array[o] = xhr.response.charCodeAt(o);
					}/**/


					//var base64 = data;
					////console.log(uint8Array, binaryString.substring(0, 27));



					urlSavestates[directory] = binaryString;

					let type = {
						text: () => binaryString,
						blob: () => new Blob([uint8Array]),
						base64: () => binaryString

					} [respType || "text"];
					////console.log(type())

					res(type());
				};
				if (event.target.readyState === 4 && event.target.status === 404) {

					rej("404: EricLenovo System does not find a file: no such file or directory.");
				};

				

				if (event.target.status !== 0 && event.target.status === 0) {

					//console.log(directory, event.target.readyState, event.target.status, "0: EricLenovo System does not find a file: the static webserver has been shut down.");
				};


			}
			xhr.open('GET', directory, true);
			xhr.send();
		})
	});

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
	});
	async function loadURL(url) {
		let a = await load("./map/" + url + ".xml", "text");
		let body = document.getElementById("CONTENT");
		let bodyHTML = document.createElement("bodycontent");
		bodyHTML.innerHTML = a;
		console.log(a)
		let content = bodyHTML.getElementsByTagName("content")[0];
		body.innerHTML = content.innerHTML;
	}

	if ("url" in SEARCH_PARAMS) {

	} else {
		loadURL("main")
	}
})(window);
