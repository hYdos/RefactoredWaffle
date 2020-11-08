const electron = require('electron');
const util = require('./util');

const ipcRenderer = electron.ipcRenderer;

let projectDir;
let assetDir;
let dataDir;

let projectInfo;
resetProjectInfo();

function resetProjectInfo() {
    projectInfo = {
        availableNamespaces: [],
        assets: {
            blockstates: [],
            blockModels: [],
            itemModels: [],
            langFiles: [],
            sounds: [],
            textures: []
        },
        datapacks: {
            dimensions: [],
            dimensionKeys: [],
            advancements: [],
            recipes: [],
            tags: []
        }
    };
}

ipcRenderer.on('setProjectDir', (event, arg) => {
    projectDir = arg.filePaths[0];
    util.readDirectory(projectDir).then(files => {
        setupProject(files).then(() => {
            console.log("setup complete!");
        });
    });
})

async function setupProject(files) {
    resetProjectInfo();
    await Promise.all(files.map(function (file) {
        return util.stat(projectDir + "/" + file).then(e => {
            if (e.isDirectory()) {
                if (file === "assets") {
                    console.log("Found asset dir!");
                    assetDir = projectDir + "/" + file;
                }
                if (file === "data") {
                    console.log("Found data dir!");
                    dataDir = projectDir + "/" + file;
                }
            }
        });
    }));
    await findNamespaces();
    await locateAssets();
    locateData();
}

/**
 *  for locating namespaces. for example "minecraft", "cool_mod_id"
 */
async function findNamespaces() {
    let files = await util.readDirectory(assetDir);
    //Assume all 'files' here are namespaces
    files.forEach(function (file) {
        projectInfo.availableNamespaces.push(file);
    })
}

/**
 *  for locating asset related things
 */
async function locateAssets() {
    //Locate blockstates first
    for (let namespace of projectInfo.availableNamespaces) {
        console.log(assetDir + "/" + namespace + "/blockstates");
        const files = await util.readDirectory(assetDir + "/" + namespace + "/blockstates");
        await Promise.all(files.map(function (file) {
            return util.readFile(assetDir + "/" + namespace + "/blockstates/" + file).then(content => {
                readBlockstate(namespace, file, content);
            });
        }))
    }
}

/**
 *  for locating datapack related things
 */
function locateData() {

}

function readBlockstate(namespace, fileName, fileContent) {
    let realName = namespace + ":" + fileName.replace(".json", "");
    let json = JSON.parse(fileContent);
    json.identifier = realName;
    projectInfo.assets.blockstates.push(json);
}


function openProject() {
    ipcRenderer.send('openProject');
}