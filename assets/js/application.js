function createForm(data, appID) {
    var form = document.createElement("div");
    form.setAttribute("class", "form");
    /* top */
    var top = document.createElement("div");
    top.setAttribute("class", "top");
    var appIcon = document.createElement("div");
    appIcon.setAttribute("class", "app-icon");
    var appIconImg = document.createElement("div");
    appIconImg.setAttribute("class", "app-icon-img");
    appIconImg.setAttribute("style", "background-image: url('" + data["appicon"] + "')");
    appIcon.appendChild(appIconImg);
    top.appendChild(appIcon);
    /* inputs */
    var inputs = document.createElement("div");
    inputs.setAttribute("class", "inputs");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("class", "input full");
    nameInput.setAttribute("placeholder", "Application Name");
    nameInput.value = data["name"];
    inputs.appendChild(nameInput);
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
    form.appendChild(bottom)
    return form;
}

var appID = getAllUrlParams().id;

fetch(sdpAPI + "getappdetails.sjs?sess=" + sess + "&id=" + appID).then(response => response.json()).then((data) => {
    $("form").innerHTML = "";
    var form = createForm(data, appID);
    $("form").appendChild(form);
}).catch((err) => {
    console.log(err);
});