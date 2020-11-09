const electron = require('electron');
const util = require("./util");
const ipcRenderer = electron.ipcRenderer;

let currentEditor = "blockstate_editor";

function openEditor(editor_name) {
    clearElements();
    for(let child of document.getElementById("editor_selector").children){
        if(child.getAttribute("id") === editor_name){
            child.setAttribute("class", "list-group-item active hoverblue");
            currentEditor = editor_name;
            renderData();
        }else {
            child.setAttribute("class", "list-group-item bg-dark text-white hoverblue");
        }
    }
}

function openProject() {
    ipcRenderer.send('openProject');
}

function renderData() {
    if(currentEditor === "blockstate_editor"){
        for(blockstateElement of projectInfo.assets.blockstates){
            createBlockstateElement(blockstateElement.identifier);
        }
    }
}

function createBlockstateElement(blockStateName) {
    let element = document.createElement("div");
    let image = document.createElement("img");
    let nameContainer = document.createElement("div");
    let name = document.createElement("p");

    element.setAttribute("class", "card mb-3 box-shadow clickableDiv");
    element.setAttribute("onclick", "alert('clicked')");
    image.setAttribute("class", "card-img-top");
    image.setAttribute("src", "https://cdn.discordapp.com/emojis/699813968159571979.png?v=1");
    nameContainer.setAttribute("class", "card-body bg-dark");
    name.setAttribute("class", "card-text");

    name.innerText = blockStateName;

    element.appendChild(image);
    element.appendChild(nameContainer);
    nameContainer.appendChild(name);

    document.getElementById("blockstate-holder").appendChild(element);
}

function clearElements(){
    document.getElementById("blockstate-holder").innerHTML = "";
}