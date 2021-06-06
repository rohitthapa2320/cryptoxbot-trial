const {parentPort}= require('worker_threads');

console.log("I am in Worker 1");

parentPort.postMessage("Hello from Worker 1");