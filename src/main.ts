import {app, BrowserWindow, dialog, ipcMain} from 'electron';
import * as path from 'path';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, 'site', 'assets', 'icon.png')
    });

    ipcMain.on('openProject', (event) => {
        dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory']
        }).then(value => {
            event.reply('setProjectDir', value);
        });
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'src', 'site', 'html', 'index.html'));
}

require('electron-reload')(__dirname);

app.on('ready', () => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
