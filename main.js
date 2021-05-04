const { app, BrowserWindow, systemPreferences, nativeTheme, ipcMain, Menu } = require('electron');
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify();
const path = require('path');
const isDev = require('electron-is-dev');

require("./engine/pybridge");
require("./engine/filebridge");

setInterval(()=>{
    autoUpdater.checkForUpdatesAndNotify();
}, 15000);



function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        'width': 1000,
        'height': 650,
        'minWidth': 400,
        'minHeight': 650,
        'title': "inscriptio",
        'webPreferences': {
            'nodeIntegration': true,
            'contextIsolation': false
        },
        'titleBarStyle': 'hiddenInset',
        'transparent': true,
        'show': false,
    });

    if(nativeTheme.shouldUseDarkColors) {
        win.setBackgroundColor("#161616");
    } else {
        win.setBackgroundColor("#f4f4f4");
    }

    win.on('page-title-updated', function(e) {
        e.preventDefault()
    });

    // TODO TODO TODO UNCOMMENT THIS!!
    win.removeMenu();
    // and load the main of the app.
    if (isDev)
        win.loadURL(`http://localhost:3000`);
    else
        win.loadURL(`file://${path.join(__dirname, './build/index.html')}`);

    
    nativeTheme.addListener("updated", function() {
        if(nativeTheme.shouldUseDarkColors) {
            win.setBackgroundColor("#161616");
            win.webContents.send("systheme-dark", "hello")
        } else {
            win.setBackgroundColor("#f4f4f4");
            win.webContents.send("systheme-light", "hello")
        }
    });

    win.once('ready-to-show', function() {
        win.show()
    });
}



const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      {
          label: 'About inscriptio',
        click: async () => {
            alert("lol imagine having an about page.");
        }
      },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Help and Documentation',
        click: async () => {
          const { shell } = require('electron');
            alert("lol imaging having docs");
          //await shell.openExternal('https://condutiondocs.shabang.cf')
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.name = 'inscriptio';
app.whenReady().then(createWindow);