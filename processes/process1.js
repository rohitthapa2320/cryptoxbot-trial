const ipc=require('node-ipc');
const path= require('path');
const {Worker} = require('worker_threads');

console.log('\nI am in process1\n');

//config for child process1
ipc.config.id   = 'process1';
ipc.config.retry= 1500;

//Created an IPC-Server 
console.log("\n IPC-Server Intialised\n");
ipc.serve(() => {
    ipc.server.on('message',(data,socket) => {
        ipc.log('got a message : ', data);
         ipc.server.emit(socket,'message', data+' New Client');
    });
    ipc.server.on('socket.disconnected',() => {
        ipc.log('client has disconnected!');
    });
});

//Starting IPC-Server
console.log("\nIPC-Server Running\n");
ipc.server.start();
console.log("\nIPC-Server Started\n");

//Created a worker for child process1
const worker1= new Worker(path.join(__dirname, '..', 'workers', 'worker1.js'));

//Listening for message from worker1
worker1.on('message', message => {
    console.log("\nReceived message from worker1: ", message);
});

//Listening for message from Main Process
process.on('message', message => {
  console.log("\nMessage received from main by process1: ", message);
  process.send("Data sent to main by process1");
//   process.exit();
});