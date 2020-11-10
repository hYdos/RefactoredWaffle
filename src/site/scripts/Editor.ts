import {projectInfo} from "./ProjectManager";
import {ipcRenderer} from "electron";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const THREE = require('three');

let currentEditor = "blockstate_editor";

document.getElementById("editor_selector").style.visibility = "hidden";
document.getElementById("left-album").style.visibility = "hidden";
document.getElementById("right-infopanel").style.visibility = "hidden";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

function openEditor(editor_name: string) {
    for (const child of [...document.getElementById("editor_selector").children]) {
        if (child.getAttribute("id") === editor_name) {
            child.setAttribute("class", "list-group-item active hoverblue");
            currentEditor = editor_name;
            renderData();
        } else {
            child.setAttribute("class", "list-group-item bg-dark text-white hoverblue");
        }
    }
}

function openProject() {
    ipcRenderer.send('openProject');
}

// Let DOM know about this

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.openProject = openProject;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.openEditor = openEditor;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renderData() {
    clearElements();
    document.getElementById("left-album").style.visibility = "hidden";
    document.getElementById("right-infopanel").style.visibility = "hidden";

    if (currentEditor === "blockstate_editor") {
        document.getElementById("left-album").style.visibility = "visible";
        document.getElementById("right-infopanel").style.visibility = "visible";
        for (const blockstateElement of projectInfo.assets.blockStates) {
            createBlockstateElement(blockstateElement.identifier);
        }
    }
}

function createH4(namespace: any) {
    const element = document.createElement("h4");
    element.innerText = namespace;
    return element;
}

function getBlockstateByName(blockstateName: string) {
    for(const blockstateId in projectInfo.assets.blockStates) {
        const blockstate = projectInfo.assets.blockStates[blockstateId];
        if(blockstate.identifier == blockstateName){
            return blockstate;
        }
    }
    return projectInfo.assets.blockStates[0];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
document.viewBlockstateInfo =  function viewBlockstateInfo(blockstateName: string) {
    // const infoPannel = document.getElementById("right-infopanel");
    // infoPannel.innerHTML = "";
    // const blockstateImage = document.createElement("img");
    // blockstateImage.setAttribute("class", "info-img");
    // blockstateImage.setAttribute("src", "../assets/placeholder.png");
    // const blockstate = getBlockstateByName(blockstateName);
    // const namespaceText = createH4(blockstate.namespace);
    // const nameText = createH4(blockstate.identifier.replace(blockstate.namespace + ":", ""));
    // const blockstateJson = createH4(JSON.stringify(blockstate.rawJson, undefined, 4));
    //
    // infoPannel.appendChild(blockstateImage);
    // infoPannel.appendChild(namespaceText);
    // infoPannel.appendChild(nameText);
    // infoPannel.appendChild(blockstateJson);
}

function createBlockstateElement(blockStateName: string) {
    const elementCol = document.createElement("div");
    const element = document.createElement("div");
    const image = document.createElement("img");
    const nameContainer = document.createElement("div");
    const name = document.createElement("p");

    element.setAttribute("class", "card mb-3 box-shadow clickableDiv");
    elementCol.setAttribute("class", "col-md-3");
    element.setAttribute("onclick", "viewBlockstateInfo('" + blockStateName + "')");
    image.setAttribute("class", "card-img-top");
    image.setAttribute("src", "../assets/placeholder.png");
    nameContainer.setAttribute("class", "card-body bg-dark");
    name.setAttribute("class", "card-text centered-text");

    name.innerText = blockStateName;

    element.appendChild(image);
    element.appendChild(nameContainer);
    nameContainer.appendChild(name);
    elementCol.appendChild(element);

    document.getElementById("blockstate_row").appendChild(elementCol);
}

function clearElements() {
    document.getElementById("blockstate_row").innerHTML = "";
}
