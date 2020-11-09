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

document.getElementById("prog-bar").style.visibility = "hidden";

ipcRenderer.on('setProjectDir', (event, arg) => {
    projectDir = arg.filePaths[0];
    if (projectDir === undefined) {
        return;
    }
    document.getElementById("prog-bar").style.visibility = "visible";
    util.readDirectory(projectDir).then(files => {
        setupProject(files).then(() => {
            document.getElementById("prog-bar").style.visibility = "hidden";
            document.getElementById("popup").style.visibility = "hidden";
            document.getElementById("editor_selector").style.visibility = "visible";
            renderData(projectInfo);
        });
    });
})

async function setupProject(files) {
    resetProjectInfo();
    await Promise.all(files.map(file => {
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
    await locateData();
}

/**
 *  for locating namespaces. for example "minecraft", "cool_mod_id"
 */
async function findNamespaces() {
    let files = await util.readDirectory(assetDir);
    //Assume all 'files' here are namespaces
    files.forEach(file => {
        projectInfo.availableNamespaces.push(file);
    })
}

/**
 *  for locating asset related things
 */
async function locateAssets() {
    //Locate blockstates first
    for (let namespace of projectInfo.availableNamespaces) {
        let files = await util.readDirectory(assetDir + "/" + namespace + "/blockstates");
        await Promise.all(files.map(file => util.readFile(assetDir + "/" + namespace + "/blockstates/" + file).then(content => {
            readBlockstate(namespace, file, content);
        })))

        files = await util.readDirectory(assetDir + "/" + namespace + "/lang");
        await findAllFilesIn(assetDir + "/" + namespace + "/lang/" + file, function e() {

        })
    }
}

async function findAllFilesIn(dir, callback) {
    Promise.all(files.map(file => util.readFile(dir).then(content => {
        console.log(content.isFolder());
    })))
}

/**
 *  for locating datapack related things
 */
async function locateData() {

}

function readBlockstate(namespace, fileName, fileContent) {
    let realName = namespace + ":" + fileName.replace(".json", "");
    let json = JSON.parse(fileContent);
    json.identifier = realName;
    projectInfo.assets.blockstates.push(json);
}

function readLangFile(namespace, fileName, fileContent) {
    let realName = namespace + ":" + fileName.replace(".json", "");
    let json = JSON.parse(fileContent);
    json.identifier = realName;
    projectInfo.assets.langFiles.push(json);
}

function readTextureFile(namespace, fileName, relativePath) {


}