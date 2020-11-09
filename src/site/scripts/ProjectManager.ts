import {promises} from "fs";
import {ipcRenderer} from "electron";
import {renderData} from "./Editor";
import {walk} from "./Util";

let projectDir: string;
let assetDir: string;
let dataDir: string;

export let projectInfo: ProjectInfo;

resetProjectInfo();

function resetProjectInfo() {
    projectInfo = {
        availableNamespaces: [],
        assets: {
            blockStates: [],
            blockModels: [],
            itemModels: [],
            langFiles: [],
            sounds: [],
            textures: []
        },
        data: {
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
    promises.readdir(projectDir).then((files: string[]) => {
        setupProject(files).then(() => {
            document.getElementById("prog-bar").style.visibility = "hidden";
            document.getElementById("popup").style.visibility = "hidden";
            document.getElementById("editor_selector").style.visibility = "visible";
            renderData();
        });
    });
})

async function setupProject(files: string[]) {
    resetProjectInfo();

    for (let file of files) {
        if ((await promises.stat(projectDir + "/" + file)).isDirectory()) {
            if (file === "assets") {
                console.log("Found asset dir!");
                assetDir = projectDir + "/" + file;
            }

            if (file === "data") {
                console.log("Found data dir!");
                dataDir = projectDir + "/" + file;
            }
        }
    }

    await findNamespaces();
    await locateAssets();
    await locateData();
}

/**
 *  for locating namespaces. for example "minecraft", "cool_mod_id"
 */
async function findNamespaces() {
    let files = await promises.readdir(assetDir);
    //Assume all 'files' here are namespaces
    files.forEach((file: string) => {
        projectInfo.availableNamespaces.push(file);
    })
}

/**
 *  for locating asset related things
 */
async function locateAssets() {
    //Locate blockstates first
    for (let namespace of projectInfo.availableNamespaces) {
        let files = await promises.readdir(assetDir + "/" + namespace + "/blockstates");

        for (let file of files) {
            readBlockState(namespace, file, (await promises.readFile(assetDir + '/' + namespace + '/blockstates/' + file)).toString());
        }

        files = await walk(assetDir + "/" + namespace + "/textures");
        console.log(files);
    }
}

/**
 *  for locating datapack related things
 */
async function locateData() {

}

function readBlockState(namespace: string, fileName: string, fileContent: string) {
    let realName = namespace + ":" + fileName.replace(".json", "");
    let json = JSON.parse(fileContent);
    json.identifier = realName;
    projectInfo.assets.blockStates.push(json);
}

function readLangFile(namespace: string, fileName: string, fileContent: string) {
    let realName = namespace + ":" + fileName.replace(".json", "");
    let json = JSON.parse(fileContent);
    json.identifier = realName;
    projectInfo.assets.langFiles.push(json);
}

function readTextureFile(namespace: string, fileName: string, relativePath: string) {


}
