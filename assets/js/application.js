var pageID = getAllUrlParams().page;

function changePage(page) {
    pageID = page;
    updatePage();
    toggleMenu(false);
}

function updatePage() {
    var defaultPage = false;
    if (pageID == "" | pageID == undefined) {
        defaultPage = true;
        pageID = "general";
    }
    $("form").innerHTML = "<div class=\"loader\"></div>";
    var params = '?page=' + pageID + '&id=' + appID;
    switch (pageID) {
        case "general":
            window.history.pushState('general', 'General Information', params);
            $("pageTitle").textContent = "General Information";
            $("pageDesc").textContent = "Set your application's name, icon, etc.";
            break;
        case "oauth":
            window.history.pushState('oauth', 'OAuth', params);
            $("pageTitle").textContent = "OAuth";
            $("pageDesc").textContent = "Use STiBaRC as an authorization system or use our API on behalf of your users.";
            break;
        case "webhooks":
            window.history.pushState('webhooks', 'Webhooks', params);
            $("pageTitle").textContent = "Webhooks";
            $("pageDesc").textContent = "Add callbacks to services when something happens on the site.";
            break;
    }
    var navItems = $(".nav-item");
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }
    $("nav-" + pageID).classList.add("active");
    getAppInfo();
    getApps();
}

function createMethodSelect(value, id) {
    var select = document.createElement("select");
    select.setAttribute("class", "input ");
    select.setAttribute("id", id);
    var option = document.createElement("option");
    option.appendChild(document.createTextNode("HTTP Method"));
    option.setAttribute("value", "");
    select.appendChild(option);
    option = document.createElement("option");
    option.appendChild(document.createTextNode("GET"));
    option.setAttribute("value", "get");
    select.appendChild(option);
    option = document.createElement("option");
    option.appendChild(document.createTextNode("POST"));
    option.setAttribute("value", "post");
    select.appendChild(option);
    select.value = value;
    return select;
}

function createTextInput(label, value, id, inputs) {
    var inputLabel = document.createElement("label");
    inputLabel.setAttribute("class", "input-label");
    inputLabel.appendChild(document.createTextNode(label));
    inputs.appendChild(inputLabel);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "input full");
    input.setAttribute("id", id);
    input.value = value;
    inputs.appendChild(input);
}

function createWebhookTextInput(label, webhook, id, inputs) {
    var inputLabel = document.createElement("label");
    inputLabel.setAttribute("class", "input-label");
    inputLabel.appendChild(document.createTextNode(label));
    inputs.appendChild(inputLabel);
    var inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "flex inputContainer");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "input flex-grow");
    input.setAttribute("id", id + "ep");
    inputContainer.appendChild(input);
    var optionValue = "";
    if (typeof (webhook) !== 'undefined') {
        input.value = webhook["endpoint"];
        optionValue = webhook["method"];
    }
    var select = createMethodSelect(optionValue, id + "m");
    inputContainer.appendChild(select);
    inputs.appendChild(inputContainer);
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
            createTextInput("Name", data["name"], "name", inputs);
            createTextInput("App Icon URL", data["appicon"], "appIconUrl", inputs);
            /* info */
            var info = document.createElement("div");
            info.setAttribute("class", "info");
            var appIDInfo = document.createElement("span");
            appIDInfo.appendChild(document.createTextNode("App ID: "));
            var codeFont = document.createElement("span");
            codeFont.setAttribute("class", "code-font");
            codeFont.appendChild(document.createTextNode(appID));
            appIDInfo.appendChild(codeFont);
            info.appendChild(appIDInfo);
            var flexGrow = document.createElement("span");
            flexGrow.setAttribute("class", "flex-grow");
            info.appendChild(flexGrow);
            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "button red outline");
            deleteBtn.setAttribute("onclick", "openDeleteAppModal()");
            deleteBtn.appendChild(document.createTextNode("Delete App"));
            info.appendChild(deleteBtn);
            inputs.appendChild(info);
            top.appendChild(inputs);
            form.appendChild(top);
            break;
        case "oauth":
            /* inputs */
            var inputs = document.createElement("div");
            inputs.setAttribute("class", "inputs");
            createTextInput("OAuth Endpoint", data["oauthend"], "oauth", inputs);
            form.appendChild(inputs);
            break;
        case "webhooks":
            var webhooks = data["webhooks"];
            /* inputs */
            var inputs = document.createElement("div");
            inputs.setAttribute("class", "inputs webhooks");
            createWebhookTextInput("New Post", webhooks["newpost"], "np", inputs);
            createWebhookTextInput("New Comment", webhooks["newcomment"], "nc", inputs);
            createWebhookTextInput("New Mention", webhooks["newmention"], "nm", inputs);
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
    updateBtn.setAttribute("onclick", "updateApp()");
    updateBtn.appendChild(document.createTextNode("Update"));
    bottom.appendChild(updateBtn);
    form.appendChild(bottom);
    return form;
}

var appID = getAllUrlParams().id;
var appName;

function getAppInfo() {
    fetch(sdpAPI + "getappdetails.sjs?sess=" + sess + "&id=" + appID).then(response => response.json()).then((data) => {
        $("form").innerHTML = "";
        var form = createForm(data, appID);
        $("form").appendChild(form);
        appName = data["name"]
        $("deleteAppName").textContent = appName;
    }).catch((err) => {
        console.log(err);
    });
}

function createAppSelect(data) {
    var inputContainer = document.createElement("div");
    var label = document.createElement("label");
    label.setAttribute("class", "input-label");
    label.appendChild(document.createTextNode("Selected app"));
    inputContainer.appendChild(label);
    var select = document.createElement("select");
    select.setAttribute("class", "input primary full");
    for (var selectAppID in data) {
        var appInfo = data[selectAppID];
        var option = document.createElement("option");
        option.value = selectAppID;
        option.appendChild(document.createTextNode(appInfo["name"]));
        select.appendChild(option);
    }
    select.value = appID;
    select.addEventListener('change', function () {
        //location.href = "./app.html?id=" + this.value;
        appID = this.value;
        updatePage();
    });
    inputContainer.appendChild(select);
    $("appSelect").appendChild(inputContainer);
}

function getApps() {
    fetch(sdpAPI + "v2/getapps.sjs?sess=" + sess).then(response => response.json()).then((data) => {
        $("appSelect").innerHTML = "";
        createAppSelect(data);
    }).catch((err) => {
        console.log(err);
    });
}

function updateApp() {
    const formData = new URLSearchParams();
    formData.append("sess", sess);
    formData.append("id", appID);
    formData.append("page", pageID);
    if (pageID == "general") {
        formData.append("name", $("name").value);
        formData.append("icon", $("appIconUrl").value);
    } else if (pageID == "oauth") {
        formData.append("oauth", $("oauth").value);
    } else if (pageID == "webhooks") {
        formData.append("npep", $("npep").value);
        formData.append("npm", $("npm").value);
        formData.append("ncep", $("ncep").value);
        formData.append("ncm", $("ncm").value);
        formData.append("nmep", $("nmep").value);
        formData.append("nmm", $("nmm").value);
    }
    fetch(sdpAPI + "v2/updateapp.sjs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    }).then(response => response.json()).then((data) => {
        if (data.status == "OK") {
            console.log("App updated");
            location.reload();
        } else {
            alert("Error updating app: " + data.toString());
        }
    }).catch((error) => {
        console.log(error);
        alert("Error updating app: " + error);
    });
}

function openDeleteAppModal() {
    $("deleteAppModal").style.display = "";
	$("appName").focus();
}

function deleteApp() {
    $("appName").classList.remove("red");
    if ($("appName").value == appName) {
        const formData = new URLSearchParams();
        formData.append("sess", sess);
        formData.append("id", appID);
        fetch(sdpAPI + "v2/deleteapp.sjs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        }).then(response => response.json()).then((data) => {
            if (data.status == "OK") {
                console.log("App deleted");
                location.href = "./applications.html";
            } else {
                alert("Error deleting app: " + data.toString());
            }
        }).catch((error) => {
            console.log(error);
            alert("Error deleting app: " + error);
        });
    } else {
        $("appName").classList.add("red");
    }
}

window.onpopstate = function (e) {
    if (e.state) {
        page = e.state;
        changePage(page);
    }
}

window.onload = updatePage();