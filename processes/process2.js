const ipc=require('node-ipc');
const path= require('path');
const {Worker} = require('worker_threads');

console.log('\nI am in process2\n');

//config for child process2
ipc.config.id   = 'process2';
ipc.config.retry= 1500;

//Connecting CLient to IPC-Server
ipc.connectTo('process1', () => {
    ipc.of.process1.on('connect', () => {
        ipc.log('Connected to ipc-server :) ');
        ipc.of.process1.emit('message','Hello');
        });
    ipc.of.process1.on('disconnect', () => {
        ipc.log('disconnected from ipc-server'.notice);
        });
    ipc.of.process1.on('message',  function(data){
        ipc.log('got a message from ipc-server : ', data);
        });
});

//Created a worker for child process2
const worker2= new Worker(path.join(__dirname, '..', 'workers', 'worker2.js'));

//Listening for message from worker1
worker2.on('message', message => {
    console.log("Received message from worker2: ", message);
});

//Listening for message from Main Process
process.on('message', message => {
  console.log("\nMessage received from main by process2: ", message);
  process.send("Data sent to main by process2");
//   process.exit();
});