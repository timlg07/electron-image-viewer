const { app, BrowserWindow } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const sander = require("sander");

  let mainWindow = null;
const IS_DEV = sander.existsSync(__dirname, ".DEV");

app.on("window-all-closed", function() {
  if (process.platform != "darwin")
    app.quit();
});

app.on("ready", function() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizeable: true,
    overlayScrollbars: true
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL("file://" + __dirname + "/app/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  mainWindow.on("maximize", function(){
    mainWindow.webContents.send("maximize");
  });

  mainWindow.on("unmaximize", function(){
    mainWindow.webContents.send("unmaximize");
  });

  ipcMain.on("quit", function(){
    app.quit();
  });

  ipcMain.on("maximize", function(){
    mainWindow.maximize();
  });

  ipcMain.on("unmaximize", function(){
    mainWindow.unmaximize();
  });

  if( IS_DEV ) {
    mainWindow.openDevTools();
  }
});
