function getAllUrlParams() {
	var queries = location.search.slice(1).split("&");
	var obj = {};
	for (var i in queries) {
		if (queries[i] != "") {
			var tmp = queries[i].split("=");
			obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
		}
	}
	return obj;
}

window.onload = function() {
	if (getAllUrlParams().state == "granted") {
		localStorage.sess = getAllUrlParams().sess.trim();
		location.href = "/applications.html";
	} else {
		location.href = "/";
	}
}