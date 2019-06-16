const {app, BrowserWindow} = require('electron');

let win;

function createWindow (){
    //create teh browser window
    win = new BrowserWindow({width:800,height:600});
    const startUrl = process.env.ELECTRON_START_URL;
    win.loadURL(startUrl);

    //load index.html
    //win.loadFile('./public/index.html');

    //open devTool
    win.webContents.openDevTools();

    win.on('closed',()=>{
        win = null;
    });
}

//be called when electron has finished
app.on('ready',createWindow);

// called when all windows are closed
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
   if(win === null){
       createWindow();
   }
});