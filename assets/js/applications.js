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
