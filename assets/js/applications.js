function createApp() {
	var appName = $("newAppName").value;
	var encodedAppName = encodeURIComponent(appName);
	fetch(sdpAPI + "newapp.sjs?sess=" + sess + "&name=" + encodedAppName).then(response => response.json()).then((data) => {
		if (data["id"] !== undefined) {
			console.log("App \"" + appName + "\" created!");
			window.location.href = "app.html?id=" + data["id"];
		}
	}).catch((err) => {
		console.log(err);
	});
}

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

fetch(sdpAPI + "v2/getapps.sjs?sess=" + sess).then(response => response.json()).then((data) => {
	$("apps").innerHTML = "";
	if (data["ERR"] !== undefined && data["ERR"] == "NA") {
		$("apps").textContent = "No apps. Click New App above to get started.";
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

$("newAppName").addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		createApp();
	}
});