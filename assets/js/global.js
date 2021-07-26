function $(id) {
	if (id.startsWith(".")) {
		return document.getElementsByClassName(id.substring(1));
	} else {
		return document.getElementById(id);
	}
}

document.addEventListener("click", function (event) {
	var isClickInside = $("pfpBtn").contains(event.target);
	var isClickInsideItems = $("pfpDropdown").contains(event.target);

	if (
		$("pfpDropdown").style.display == "none" ||
		$("pfpDropdown").style.display == "" ||
		isClickInsideItems
	) {
		$("pfpDropdown").style.display = "block";
	} else {
		$("pfpDropdown").style.display = "none";
	}
	if (!isClickInside && !isClickInsideItems) {
		//the click was outside the nav dropdown
		$("pfpDropdown").style.display = "none";
	}
});
