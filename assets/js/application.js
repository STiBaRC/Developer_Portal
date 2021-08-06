var pageID = getAllUrlParams().page;

function changePage(page) {
    pageID = page;
    updatePage();
}

function updatePage() {
    if (pageID == "" | pageID == undefined) {
        pageID = "general";
    }
    const appID = getAllUrlParams().id;
    $("form").innerHTML = "<div class=\"loader\"></div>";
    switch (pageID) {
        case "general":
            window.history.pushState('general', 'General Information', '?id=' + appID + '&page=general');
            $("pageTitle").textContent = "General Information";
            $("pageDesc").textContent = "Set your application's name, icon, etc.";
            break;
        case "webhooks":
            window.history.pushState('webhooks', 'Webhooks', '?id=' + appID + '&page=webhooks');
            $("pageTitle").textContent = "Webhooks";
            $("pageDesc").textContent = "Add callbacks to services when something happens on the site";
            break;
    }
    var navItems = $(".nav-item");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }
    $("nav-" + pageID).classList.add("active");
    getAppInfo();
}

function createForm(data, appID) {
    var form = document.createElement("div");
    form.setAttribute("class", "form");
    switch (pageID) {
        case "general":
            /* top */
            var top = document.createElement("div");
            top.setAttribute("class", "top");
            var appIconWrapper = document.createElement("div");
            var inputLabel = document.createElement("label");
            inputLabel.setAttribute("class", "input-label");
            inputLabel.appendChild(document.createTextNode("App Icon"));
            appIconWrapper.appendChild(inputLabel);
            var appIcon = document.createElement("div");
            appIcon.setAttribute("class", "app-icon");
            var appIconImg = document.createElement("div");
            appIconImg.setAttribute("class", "app-icon-img");
            appIconImg.setAttribute("style", "background-image: url('" + data["appicon"] + "')");
            appIcon.appendChild(appIconImg);
            appIconWrapper.appendChild(appIcon);
            top.appendChild(appIconWrapper);
            /* inputs */
            var inputs = document.createElement("div");
            inputs.setAttribute("class", "inputs");
            var inputLabel = document.createElement("label");
            inputLabel.setAttribute("class", "input-label");
            inputLabel.appendChild(document.createTextNode("Name"));
            inputs.appendChild(inputLabel);
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "input full");
            input.value = data["name"];
            inputs.appendChild(input);
            inputLabel = document.createElement("label");
            inputLabel.setAttribute("class", "input-label");
            inputLabel.appendChild(document.createTextNode("App Icon URL"));
            inputs.appendChild(inputLabel);
            input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "input full");
            input.value = data["appicon"];
            inputs.appendChild(input);
            /* info */
            var appIDelement = document.createElement("div");
            appIDelement.setAttribute("class", "appID");
            appIDelement.appendChild(document.createTextNode("App ID: "));
            var codeFont = document.createElement("span");
            codeFont.setAttribute("class", "code-font");
            codeFont.appendChild(document.createTextNode(appID));
            appIDelement.appendChild(codeFont);
            inputs.appendChild(appIDelement);
            top.appendChild(inputs);
            form.appendChild(top);
            break;
        case "webhooks":
            var webhooks = data["webhooks"];
            /* inputs */
            var inputs = document.createElement("div");
            inputs.setAttribute("class", "inputs");
            var inputLabel = document.createElement("label");
            inputLabel.setAttribute("class", "input-label");
            inputLabel.appendChild(document.createTextNode("New Post"));
            inputs.appendChild(inputLabel);
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "input full");
            input.value = webhooks["newpost"]["endpoint"];
            inputs.appendChild(input);
            inputLabel = document.createElement("label");
            inputLabel.setAttribute("class", "input-label");
            inputLabel.appendChild(document.createTextNode("New Comment"));
            inputs.appendChild(inputLabel);
            input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "input full");
            input.value = webhooks["newcomment"]["endpoint"];
            inputs.appendChild(input);
            form.appendChild(inputs);
            break;
    }
    /* bottom */
    var bottom = document.createElement("div");
    bottom.setAttribute("class", "m-top-medium flex");
    var flexGrow = document.createElement("span");
    flexGrow.setAttribute("class", "flex-grow");
    bottom.appendChild(flexGrow);
    var updateBtn = document.createElement("button");
    updateBtn.setAttribute("class", "button");
    updateBtn.appendChild(document.createTextNode("Update"));
    bottom.appendChild(updateBtn);
    form.appendChild(bottom);
    return form;
}

var appID = getAllUrlParams().id;

function getAppInfo() {
    fetch(sdpAPI + "getappdetails.sjs?sess=" + sess + "&id=" + appID).then(response => response.json()).then((data) => {
        $("form").innerHTML = "";
        var form = createForm(data, appID);
        $("form").appendChild(form);
    }).catch((err) => {
        console.log(err);
    });
}

window.onpopstate = function (e) {
    if (e.state) {
        page = e.state;
        changePage(page);
    }
}

window.onload = updatePage();