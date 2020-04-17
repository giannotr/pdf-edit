const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const { app, BrowserWindow, screen } = electron;

const computeWindowDimen = () => {
  const screenWidth = screen.getPrimaryDisplay().workAreaSize.width;
  let width = 600, height = 450;

  if(screenWidth > 1366) {
    width  = 800;
    height = 600;
  } else if(screenWidth > 1920) {
    width  = 1000;
    height = 750;
  } else if(screenWidth > 3000) {
    width  = 1200;
    height = 900;
  }

  return { width, height };
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    ...computeWindowDimen(),
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.maximize();

  mainWindow.loadURL(isDev ?
    'http://localhost:3000'
    :
    `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
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
