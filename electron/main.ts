import { app, BrowserWindow, ipcMain, dialog, IpcMainInvokeEvent } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { addBackup, getBackups } from './settings';
import { BackupMetadata } from '../src/types/BackupMetadata';

let win: BrowserWindow;

function createWindow() {

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),

    },
    autoHideMenuBar: true
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === "win32" ? ".cmd" : "")),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }
}

app.whenReady().then(() => {

  ipcMain.handle('dialog:openFolder', handles.openFolder)
  ipcMain.handle("store:addBackup", handles.addBackup);
  ipcMain.handle("store:getBackups", handles.getBackups);

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});

const handles = {
  openFolder: async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"]
    })
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  },
  addBackup: async (_: IpcMainInvokeEvent, data: BackupMetadata) => {
    addBackup(data);
  },
  getBackups: async () => {
    return getBackups();
  }
}