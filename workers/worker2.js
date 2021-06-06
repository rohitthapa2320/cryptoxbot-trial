const {parentPort}= require('worker_threads');

console.log("I am in Worker 2");

parentPort.postMessage("Hello from Worker 2");