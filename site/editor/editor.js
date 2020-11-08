const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

function openEditor(editor_name) {
    for(let child of document.getElementById("editor_selector").children){
        if(child.getAttribute("id") === editor_name){
            child.setAttribute("class", "list-group-item active hoverblue");
        }else {
            child.setAttribute("class", "list-group-item bg-dark text-white hoverblue");
        }
    }
}

function openProject() {
    ipcRenderer.send('openProject');
}
