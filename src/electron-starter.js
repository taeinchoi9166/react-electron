const {app, BrowserWindow} = require('electron');
const path = require('path');
let win;

function createWindow (){
    //create teh browser window
    win = new BrowserWindow({width:800,height:600});
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname,'../build/index.html')}`;
    //해당 url로 파일 가져와 붙여주기
    win.loadURL(startUrl);

    //load index.html
    //win.loadFile('./public/index.html');

    //open devTool
    win.webContents.openDevTools();

    win.on('closed',()=>{
        win = null;
    });
}

//electron이 준비되면 윈도우 만들어 띄워주기
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