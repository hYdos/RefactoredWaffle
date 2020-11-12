import {projectInfo} from "./ProjectManager";
import {ipcRenderer} from "electron";
import {HtmlBuilder} from "./htmlBuilder";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const THREE = require('three');

let currentEditor = "blockstate_editor";

document.getElementById("editor_selector").style.visibility = "hidden";
document.getElementById("editor").style.visibility = "hidden";

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
    document.getElementById("editor").style.visibility = "hidden";

    if (currentEditor === "blockstate_editor") {
        document.getElementById("editor").style.visibility = "visible";
        for (const blockstateElement of projectInfo.assets.blockStates) {
            createBlockstateElement(blockstateElement.identifier);
        }
    }
}

function createText(namespace: string) {
    const element = document.createElement("label");
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
    const infoPannel = document.getElementById("right_info");
    infoPannel.innerHTML = "";
    const blockstateImage = document.createElement("img");
    blockstateImage.setAttribute("class", "info-img align-self-center");
    blockstateImage.setAttribute("src", "../assets/placeholder.png");
    const blockstate = getBlockstateByName(blockstateName);
    const namespaceText = createText("Namespace: " + blockstate.namespace);
    const nameText = createText("Path: " + blockstate.identifier.replace(blockstate.namespace + ":", ""));

    //Create the tab thing
    const tabFlexbox = document.createElement("div");
    const processedTab = document.createElement("button");
    const rawTab = document.createElement("button");
    const tabSeparator = document.createElement("hr");

    //Test new html lib
    const variantText = new HtmlBuilder("label")
        .setClasses("pad-right")
        .setText("Variant:");

    const variantDropdown = new HtmlBuilder("div")
        .setClasses("d-flex flex-row");

    tabFlexbox.setAttribute("class", "d-flex flex-row");
    processedTab.setAttribute("class", "btn text-white bg-dark tab align-self-start");
    rawTab.setAttribute("class", "btn text-white bg-dark tab align-self-start");
    processedTab.setAttribute("onClick", "alert('not finished!')");
    processedTab.setAttribute("onClick", "alert('not finished!')");
    processedTab.innerText = "Processed";
    rawTab.innerText = "Raw";
    tabSeparator.setAttribute("class", "line");
    //TODO: parse blockstate.rawJson

    tabFlexbox.appendChild(processedTab);
    tabFlexbox.appendChild(rawTab);

    infoPannel.appendChild(blockstateImage);
    infoPannel.appendChild(namespaceText);
    infoPannel.appendChild(nameText);
    infoPannel.appendChild(document.createElement("br"));
    infoPannel.appendChild(tabFlexbox);
    infoPannel.appendChild(tabSeparator);
    infoPannel.appendChild(document.createElement("br"));
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
