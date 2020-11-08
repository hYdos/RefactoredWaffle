const electron = require('electron');
const fs = require('fs');
const path = require('path');

const ipcRenderer = electron.ipcRenderer;

let projectDir;
let assetDir;
let dataDir;

let projectInfo = {
    availableNamespaces: [],
    assets: {
        blockstates: [

        ],
        blockModels: [

        ],
        itemModels: [

        ],
        langFiles: [

        ],
        sounds: [

        ],
        textures: [

        ]
    },
    datapacks: {
        dimensions: [

        ],
        dimensionKeys: [

        ],
        advancements: [

        ],
        recipes: [

        ],
        tags: [

        ]
    }
};



ipcRenderer.on('setProjectDir', (event, arg) => {
    projectDir = arg.filePaths[0];
    fs.readdir(projectDir, function (err, files) {
        if (err) {
            return console.log("An error has occured while reading an directory: " + err);
        }
        setupProject(files);
    });
})

function setupProject(files){
    files.forEach(function (file) {
        if(fs.statSync(projectDir + "/" + file).isDirectory()){
            if(file == "assets"){
                console.log("Found asset dir!");
                assetDir = projectDir + "/" + file;
            }
            if(file == "data"){
                console.log("Found data dir!");
                dataDir = projectDir + "/" + file;
            }
        }
    });

    findNamespaces();
    locateAssets();
    locateData();
}

/**
 *  for locating namespaces. for example "minecraft", "cool_mod_id"
 */
function findNamespaces(){
    fs.readdir(assetDir, function (err, files) {
        if (err) {
            return console.log("An error has occured while searching for namespaces: " + err);
        }
        //Assume all 'files' here are namespaces
        files.forEach(function (file) {
            projectInfo.availableNamespaces.push(file);
        })
    })
}

/**
 *  for locating asset related things
 */
function locateAssets(){

}

/**
 *  for locating datapack related things
 */
function locateData(){
    
}

function openProject(){
    ipcRenderer.send('openProject');
}