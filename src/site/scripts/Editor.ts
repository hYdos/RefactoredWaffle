import {projectInfo} from "./ProjectManager";
import {ipcRenderer} from "electron";
import {HtmlBuilder} from "./htmlBuilder";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const THREE = require('three');

let currentEditor = "blockstate_editor";

document.getElementById("editor_selector").style.visibility = "hidden";
document.getElementById("editor").style.visibility = "hidden";

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
    const blockstate = getBlockstateByName(blockstateName);

    const blockstateImage = new HtmlBuilder("img")
        .setClasses("info-img align-self-center")
        .setSrc("../assets/placeholder.png")
        .build();

    const namespaceText = new HtmlBuilder("label")
        .setText("Namespace: " + blockstate.namespace)
        .build();

    const nameText = new HtmlBuilder("label")
        .setText("Path: " + blockstate.identifier.replace(blockstate.namespace + ":", ""))
        .build();

    const tabFlexbox = new HtmlBuilder("div")
        .setClasses("d-flex flex-row")
        .build();

    const processedTab = new HtmlBuilder("button")
        .setClasses("btn text-white bg-dark tab align-self-start")
        .setText("Processed")
        .onClick("alert('not finished!')")
        .build();

    const rawTab = new HtmlBuilder("button")
        .setClasses("btn text-white bg-dark tab align-self-start")
        .setText("Raw")
        .onClick("alert('not finished!')")
        .build();

    const tabSeparator = new HtmlBuilder("hr")
        .setClasses("line")
        .build();

    const variantDropdown = new HtmlBuilder("div")
        .setClasses("d-flex flex-row")
        .build();

    const variantText = new HtmlBuilder("label")
        .setClasses("pad-right")
        .setText("Variant:")
        .build();

    const variantButtonGroup = new HtmlBuilder("div")
        .setClasses("btn-group")
        .build();

    const firstVariantKey = Object.keys(blockstate.variants)[0];
    for (const variantKey in blockstate.variants) {
        const variant = blockstate.variants[variantKey];
        console.log(firstVariantKey + "->" + variantKey);
        if(firstVariantKey !== variantKey){
            console.log(variant);
        }
    }

    variantDropdown.appendChild(variantText);

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
