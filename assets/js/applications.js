// var toLink = function (item) {
// 	try {
// 		var i = item.indexOf(':');
// 		var splits = [item.slice(0, i), item.slice(i + 1)];
// 		$("applist").innerHTML = $("applist").innerHTML.concat('<li><a href="app.html?id=').concat(splits[0]).concat('">').concat(splits[1].replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat("</a></li>");
// 		lastid = splits[0];
// 	} catch (err) {
// 		console.log("Whoops");
// 	}
// }

// window.onload = function () {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("post", "https://developer.stibarc.com/api/getapps.sjs", true);
// 	xhr.send("sess=" + sess);
// 	xhr.onload = function (e) {
// 		var tmp = xhr.responseText.split("\n");
// 		$("applist").innerHTML = "";
// 		for (i = 0; i < tmp.length - 1; i++) {
// 			toLink(tmp[i]);
// 		}
// 	}
// 	$("newapp").onclick = function (e) {
// 		var id = prompt("App name?");
// 		if (id != "" && id != undefined) {
// 			var xhr = new XMLHttpRequest();
// 			xhr.open("post", "https://developer.stibarc.com/api/newapp.sjs", false);
// 			xhr.send("sess=" + sess + "&name=" + encodeURIComponent(id));
// 			location.reload();
// 		}
// 	}
// 	$("deleteapp").onclick = function (e) {
// 		var id = prompt("App id?");
// 		if (id != "" && id != undefined && confirm("Are you sure?")) {
// 			if (confirm("Absolutely positive?")) {
// 				var xhr = new XMLHttpRequest();
// 				xhr.open("post", "https://developer.stibarc.com/api/deleteapp.sjs", false);
// 				xhr.send("sess=" + sess + "&id=" + encodeURIComponent(id));
// 				location.reload();
// 			}
// 		}
// 	}
// }

function appModule(data, id) {
	var appWrapper = document.createElement("span");
	appWrapper.setAttribute("class", "app-wrapper");
	var app = document.createElement("a");
	app.setAttribute("class", "app");
	app.setAttribute("href", "./app.html?id=" + id);
	var appIcon = document.createElement("div");
	appIcon.setAttribute("class", "app-icon-img");
	appIcon.setAttribute("style", "background-image: url('" + data["appicon"] + "')");
	app.appendChild(appIcon);
	var appDetails = document.createElement("div");
	appDetails.setAttribute("class", "app-details");
	appDetails.appendChild(document.createTextNode(data["name"]));
	app.appendChild(appDetails);
	appWrapper.appendChild(app);
	return appWrapper;
}

function showApps(data) {
	var apps = document.createElement("div");
	apps.setAttribute("class", "apps");
	for (var appID in data) {
		var appInfo = data[appID];
		var app = appModule(appInfo, appID);
		apps.appendChild(app);
	}
	$("apps").innerHTML = "";
	$("apps").appendChild(apps);
}

fetch(sdpAPI + "getappsinfo.sjs?sess=" + sess).then(response => response.json()).then((data) => {
	$("apps").innerHTML = "";
	if (data["ERR"] !== undefined && data["ERR"] == "NA") {
		$("apps").textContent = "No apps";
	} else {
		showApps(data);
	}
}).catch((err) => {
	console.log(err);
});

function newApp() {
	$("newAppModal").style.display = "";
	$("newAppName").focus();
}

function closeDialogs() {
	const overlays = $(".overlay");
	for (var i = 0; i < overlays.length; i++) {
		overlays[i].style.display = "none";
	}
}
