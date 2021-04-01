const electron = require('electron');
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
//const Dialog = electron.Dialog
const { app, BrowserWindow, dialog, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');

const fs = require('fs');

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

const settings = require('electron-settings');

const ipcMain = require('electron').ipcMain;

//const isOnline = require("is-online");

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('checking-for-update', () => {
	console.log('Checking for updates...');
	//sendStatusToWindow("Checking for update...");
});

ipcMain.on('runCommand', async (event, arg) => {
	console.log('test...');
	const result = autoUpdater.checkForUpdates();
	console.log('past check...');
	result
		.then((checkResult) => {
			const { updateInfo } = checkResult;
			console.log('updateInfo...', updateInfo);
			event.returnValue = updateInfo;
			//sender.send(IPCConstants.CHECK_FOR_UPDATE_SUCCESS, updateInfo);
		})
		.catch((error) => {
			console.log('error...', error);
			event.returnValue = error;
			//sender.send(IPCConstants.CHECK_FOR_UPDATE_FAILURE);
		});
});

ipcMain.on('check-for-update', async (event, arg) => {
	console.log('Check for updates...');
	async = () => {
		console.log('test...');
		const result = autoUpdater.checkForUpdates();

		result
			.then((checkResult) => {
				const { updateInfo } = checkResult;
				console.log('updateInfo...', updateInfo);
				//sender.send(IPCConstants.CHECK_FOR_UPDATE_SUCCESS, updateInfo);
			})
			.catch((error) => {
				console.log('error...', error);
				//sender.send(IPCConstants.CHECK_FOR_UPDATE_FAILURE);
			});
	};
});

autoUpdater.on('update-available', (info) => {
	console.log('Update Available');
	console.log('Version', info.version);
	console.log('Release Date', info.releaseDate);
	//sendStatusToWindow("Update available.");
	mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-not-available', () => {
	console.log('Update not Available');
	//sendStatusToWindow("Update not available.");
	mainWindow.webContents.send('update-not-available');
});

autoUpdater.on('download-progress', (progress) => {
	console.log(`Progress ${Math.floor(progress.percent)}`);
	var data = Math.floor(progress.percent);
	mainWindow.webContents.send('download-progress', data);
});

autoUpdater.on('update-downloaded', (info) => {
	console.log('Update Downloaded');
	//sendStatusToWindow("Update downloaded");
	autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
	console.log('error', error);
	//sendStatusToWindow("Error in auto-updater. " + error);
});

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 680,
		icon: __dirname + '/icon/logo64x64.png',
		webPreferences: {
			nodeIntegration: true
		}
	});

	/*(async () => {
    var onlineStatus = await isOnline();
    console.log("onlineStatus", onlineStatus);
    if (!isDev && onlineStatus) {
      autoUpdater.checkForUpdates();
    }
  })();*/

	/*if (!settings.has("databasePath")) {
    settings.set("databasePath", "");
    settings.set("folderPath", "");
    settings.set("fileNameDelimiter", "-");
    settings.set("fileNamePrepend", "ID");
    settings.set("loadOnStart", false);
    settings.set("quessColumnFilters", false);
  }*/

	//if (isDev) {
	mainWindow.webContents.openDevTools();
	//}

	mainWindow.setMenuBarVisibility(false);

	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
