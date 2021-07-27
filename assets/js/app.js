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

/* user info */
if (localStorage.getItem('pfp') !== null && localStorage.getItem('pfp') !== "") {
    $("pfpBtnImg").src = localStorage.getItem('pfp');
}

var sess = localStorage.getItem("sess");
var loggedIn = false;
if (sess !== null && sess !== "") {
    loggedIn = true;
}

if(!loggedIn) {
    window.location = "/";
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
        }
    };
    xhttp.open('GET', 'https://api.stibarc.com/v2/getuserpfp.sjs?id=' + username, true);
    xhttp.send();
}

getUserInfo();