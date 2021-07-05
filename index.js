const express= require('express');
const mongoose = require('mongoose');
const {fork} = require('child_process');
const path= require('path');


const sequelize= require('./utils/database');

const tickerRoutes= require('./routes/tickers');

const tradeRoutes= require('./routes/trades');


//Created an express app
const app = express();

const PORT = 3000;

//Middleware to handle tickers requests
app.use(tickerRoutes);
app.use('/trades',tradeRoutes);






//Listening on all requests
app.use('/', (req,res,next) => {
  res.send("<h1>Hello from CryptoXBot</h1>");
});

//Main Process
console.log("\nI am in main process\n");

//Forking Child Process1
console.log("\nChild Process1 is started\n");
const childProcess1= fork(path.join(__dirname,'processes','process1.js'));

//Forking Child Process2
console.log("\nChild Process2 is started\n");
let childProcess2;
setTimeout(()=> {
  childProcess2= fork(path.join(__dirname,'processes','process2.js'));
  childProcess2.send("Data sent to process2 from main");
  childProcess2.on('message', message => {
  console.log("Message received by main from process2: ", message);
});

},2000);
// const childProcess2= fork(path.join(__dirname,'processes','process2.js'));

//Sending data to child process1
childProcess1.send("Data sent to process1 from main");

//Sending data to child process2
// childProcess2.send("Data sent to process2 from main");

//Listening for message from child process1
childProcess1.on('message', message => {
  console.log("Message received by main from process1: ", message);
});

//Listening for message from child process2
// childProcess2.on('message', message => {
//   console.log("Message received by main from process2: ", message);
// });

sequelize.sync().then( () => {
  // console.log(result);
  const server= app.listen(PORT, () => {
    console.log(`\nServer running on PORT: ${PORT}`);
    console.log("\nDatabase Connected\n");

  //   const io = require("socket.io")(server);

  //   io.on("connection", socket => {
  // // either with send()
  // socket.send("Hello!, I am your server !!");

  // // or with emit() and custom event names
  // socket.emit("greetings", "Hey!", { "ms": "jane" });

  // // handle the event sent with socket.send()
  // socket.on("message", (data) => {
  //   console.log(data);
  // });

  // // handle the event sent with socket.emit()
  // socket.on("salutations", (elem1, elem2) => {
  //   console.log(elem1, elem2);
  // });
// });
  });
}).catch(err => console.log(err));


// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

//MongoDB Atlas URL
// const CONNECTION_URL= 'mongodb+srv://thaparikki:rohitthapa2120@cluster0.xikx7.mongodb.net/memories?retryWrites=true&w=majority';

// //Connected Express App to MongoDB Atlas
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//   .then(()=> {
//     app.listen(PORT, () => { //Created an HTTP Server
//       console.log("\nServer is running on PORT: ", PORT);
//       console.log("\nDatabase is connected\n");
//     });
//   }).catch((err)=> console.log(err.message));