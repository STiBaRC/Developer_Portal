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
