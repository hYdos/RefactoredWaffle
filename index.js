const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
  
    window.loadFile('site/index.html');
    // window.webContents.openDevTools();
    // window.removeMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

ipcMain.on('openProject', function(event, args) {
    dialog.showOpenDialog(window, {
        properties: ['openDirectory']
    }).then(value => {
        event.reply("setProjectDir", value);
    });
});
