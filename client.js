// const io= require('socket.io-client');

// const URL = 'wss://api-pub.bitfinex.com/ws/2';

// const socket = io(URL);

// socket.on('connect', () => {
//   // socket.send("Heya! I am new client :)");

//   // socket.emit("salutations", "Hello!", { "mr": "john" });

//   console.log('Connected');

// });

// // socket.on("message", data => {
// //   console.log(data);
// // });

// // socket.on("greetings", (elem1, elem2) => {
// //   console.log(elem1, elem2);
// // });

const ws = require('ws')
const w = new ws('wss://api-pub.bitfinex.com/ws/2')

w.on('message', (msg) => console.log(msg))

let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'book', 
  symbol: 'tBTCUSD' 
})

w.on('open', () => w.send(msg))