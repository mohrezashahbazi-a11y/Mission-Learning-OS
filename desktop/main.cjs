const { app, BrowserWindow, shell } = require('electron');
const { session } = require('electron');
const URL = 'https://mohrezashahbazi-a11y.github.io/Mission-Learning-OS/';
function createWindow(){
  const win=new BrowserWindow({width:1440,height:950,minWidth:1000,minHeight:700,backgroundColor:'#080d17',autoHideMenuBar:true,webPreferences:{contextIsolation:true,nodeIntegration:false,sandbox:true}});
  win.loadURL(URL);
  win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return {action:'deny'}});
}
app.whenReady().then(()=>{session.defaultSession.setPermissionRequestHandler((_wc,permission,callback)=>callback(['notifications'].includes(permission));createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
