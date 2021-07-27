window.onload = function() {
	var sess = window.localStorage.getItem("sess");
	var xhr = new XMLHttpRequest();
	xhr.open("post","api/getapps.sjs", true);
	xhr.send("sess="+sess);
	xhr.onload = function(e) {
		// var tmp = xhr.responseText.split("\n");
		// document.getElementById("applist").innerHTML = "";
		// for (i = 0; i < tmp.length -1; i++) {
		// 	toLink(tmp[i]);
		// }
	}
}