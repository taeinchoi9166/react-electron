//build되면 여기는 사용 안됨

const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000; //포트설정

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

//react 구동 성공시 electron을 켜준다.
let startedElectron = false;
const tryConnection = () => client.connect({port:port},()=>{
   client.end();
   if(!startedElectron){
       console.log('start electron');
       startedElectron = true;
       const exec = require('child_process').exec;
       exec('yarn run electron');
   }
});

tryConnection();

client.on('error',(error)=>{ //안되면 될때까지
   setTimeout(tryConnection,1000);
});