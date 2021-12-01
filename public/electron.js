const electron = require("electron");
const { app, BrowserWindow, dialog, Menu } = require("electron");
const { autoUpdater } = require("electron-updater");
const {
  NO_UPDATE_CHECK_PENDING,
  NO_UPDATE_AVAILABLE,
  CHECK_FOR_UPDATE_PENDING,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_UPDATE_FAILURE,
  QUIT_AND_INSTALL_UPDATE,
} = require("./constants/IPCConstants");

const fs = require("fs");

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

const settings = require("electron-settings");

const ipcMain = require("electron").ipcMain;

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on("checking-for-update", () => {
  console.log("Checking for updates...");
  mainWindow.webContents.send("send-console", "Checking for updates...");
});

ipcMain.on("runCommand", (event) => {
  if (isDev) {
    mainWindow.webContents.send(NO_UPDATE_AVAILABLE);
  } else {
    console.log("test...");
    mainWindow.webContents.send("send-console", "message came from electron");
    autoUpdater.checkForUpdates();
    console.log("past check...");
  }
});

autoUpdater.on("update-available", (info) => {
  mainWindow.webContents.send("send-console", "Update Available");
  console.log("Update Available");
  console.log("Version", info.version);
  console.log("Release Date", info.releaseDate);
  //sendStatusToWindow("Update available.");
  mainWindow.webContents.send(CHECK_FOR_UPDATE_SUCCESS, info);
});

autoUpdater.on("update-not-available", () => {
  mainWindow.webContents.send("send-console", "Update not Available");
  console.log("Update not Available");
  //sendStatusToWindow("Update not available.");
  mainWindow.webContents.send(NO_UPDATE_AVAILABLE);
});

autoUpdater.on("download-progress", (progress) => {
  console.log(`Progress ${Math.floor(progress.percent)}`);
  var data = Math.floor(progress.percent);
  mainWindow.webContents.send(DOWNLOAD_UPDATE_PENDING, data);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("Update Downloaded");
  //sendStatusToWindow("Update downloaded");
  mainWindow.webContents.send(DOWNLOAD_UPDATE_SUCCESS);
  //autoUpdater.quitAndInstall();
});

autoUpdater.on("error", (error) => {
  console.log("error", error);
  mainWindow.webContents.send("send-console", "Update Error: " + error);
  mainWindow.webContents.send(CHECK_FOR_UPDATE_FAILURE, error);
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, (event) => {
  console.log(QUIT_AND_INSTALL_UPDATE);
  mainWindow.webContents.send("send-console", "opening installer");
  autoUpdater.quitAndInstall();
});

ipcMain.on("start-download", (event) => {
  console.log("start-download");
  mainWindow.webContents.send("send-console", "starting Download");
  autoUpdater.downloadUpdate();
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: __dirname + "/icon/logo64x64.png",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  autoUpdater.autoDownload = false;

  if (!settings.has("startYear")) {
    settings.set("maxSlot", "5");
    settings.set("startYear", "1444");
    settings.set("endYear", "1821");
    settings.set("workspaces", []);
  }

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
