window.onload = function() {

	function loadPage() {
		var hash = window.location.hash;
		var item = getItem(hash);
		if(!item) return;
		document.getElementById("myFrame").setAttribute("src", item.url);
		document.getElementById("tit").innerHTML=item.name;
	}
	
	loadPage();

	document.body.onhashchange = loadPage;

	function createXHR() {
		if(typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != "undefined") {
			if(typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
						"MSXML2.XMLHttp"
					],
					i, len;
				for(i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch(ex) {}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		} else {
			throw new Error("No XHR object available.");
		}
	}

	function getRouterData() {
		if(window.router) {
			return window.router;
		}
		var xhr = createXHR();
		xhr.open("get", "lib/router.json", false);
		xhr.send(null);
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			var res = xhr.responseText;
			try {
				return JSON.parse(res);
			} catch(e) {
				return null;
			}
		} else {
			return null;
		}
	}

	function getItem(key) {
		var router = getRouterData();
		var result;
		if(router && Array.isArray(router)) {
			router.forEach(function(item) {
				if(typeof item == "object" && item.key == key) {
//					url = item.url;
					result=item;
				}
			})
		}
		return result;
	}
}