const electron = require('electron');
const fs = require('fs');
const path = require('path');

const ipcRenderer = electron.ipcRenderer;

let projectDir;

ipcRenderer.on('setProjectDir', (event, arg) => {
    projectDir = arg.filePaths[0];
    fs.readdir(projectDir, function (err, files) {
        if (err) {
            return console.log("An error has occured while reading an directory: " + err);
        } 
        files.forEach(function (file) {
            if(fs.statSync(projectDir + "/" + file).isDirectory()){
                console.log(file + " is a dir"); 
            }else {
                console.log(file + " is a file"); 
            }
        });
    });
})

function openProject(){
    ipcRenderer.send('openProject');
}