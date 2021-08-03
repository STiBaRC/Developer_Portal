const sdpAPI = "https://developer.stibarc.com/api/";

function $(id) {
    if (id.startsWith(".")) {
        return document.getElementsByClassName(id.substring(1));
    } else {
        return document.getElementById(id);
    }
}

document.addEventListener("click", function (event) {
    /* user dropdown */
    var pfpBtnClicked = $("pfpBtn").contains(event.target);
    var mobilePfpBtnClicked = $("mobilePfpBtn").contains(event.target);
    var dropDownClicked = $("pfpDropdown").contains(event.target);
    if (
        $("pfpDropdown").style.display == "none" ||
        $("pfpDropdown").style.display == "" ||
        dropDownClicked
    ) {
        $("pfpDropdown").style.display = "block";
    } else {
        $("pfpDropdown").style.display = "none";
    }
    if (!pfpBtnClicked && !mobilePfpBtnClicked && !dropDownClicked) {
        //the click was outside the nav dropdown
        $("pfpDropdown").style.display = "none";
    }
    /* dialog */
    var overlays = $(".overlay");
    for (var i = 0; i < overlays.length; i++) {
        if (overlays[i] == event.target) {
            overlays[i].style.display = "none";
        }
    }
});

var mobileMenuOpen = false;

function toggleMenu() {
    if (!mobileMenuOpen) {
        mobileMenuOpen = true;
        $(".sidebar")[0].classList.add("open");
    } else {
        mobileMenuOpen = false;
        $(".sidebar")[0].classList.remove("open");
    }
}

/* user info */
if (localStorage.getItem('pfp') !== null && localStorage.getItem('pfp') !== "") {
    $("pfpBtnImg").src = localStorage.getItem('pfp');
}

var sess = localStorage.getItem("sess");
var loggedIn = false;
if (sess !== null && sess !== "") {
    loggedIn = true;
}

// get profile info //
function getUserInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        localStorage.setItem("username", this.responseText.replace(/(\r\n|\n|\r)/gm, ""));
        getUserPfp('pfpBtnImg', localStorage.getItem("username"));
        $("pfp-username").textContent = localStorage.getItem("username");
    };
    xhttp.open('GET', 'https://api.stibarc.com/v2/getusername.sjs?sess=' + localStorage.getItem("sess"), true);
    xhttp.send();
}

// get profile pfp //
function getUserPfp(callback, username) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        var userPfp = this.responseText;
        if (callback == 'post') {
            $("postPfp").src = userPfp;
        } else {
            localStorage.setItem('pfp', userPfp);
            $("pfpBtnImg").src = localStorage.getItem('pfp');
            $("mobilePfpBtnImg").src = localStorage.getItem('pfp');
        }
    };
    xhttp.open('GET', 'https://api.stibarc.com/v2/getuserpfp.sjs?id=' + username, true);
    xhttp.send();
}

getUserInfo();