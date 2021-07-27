function $(id) {
    if (id.startsWith(".")) {
        return document.getElementsByClassName(id.substring(1));
    } else {
        return document.getElementById(id);
    }
}

var sess = localStorage.getItem("sess");
var loggedIn = false;
if (sess !== null && sess !== "") {
    loggedIn = true;
}