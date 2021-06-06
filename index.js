const express= require('express');
const mongoose = require('mongoose');
const {fork} = require('child_process');
const path= require('path');

const tickerRoutes= require('./routes/tickers');

//Created an express app
const app = express();

const PORT = 3000;

//Middleware to handle tickers requests
app.use(tickerRoutes);


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
const childProcess2= fork(path.join(__dirname,'processes','process2.js'));

//Sending data to child process1
childProcess1.send("Data sent to process1 from main");

//Sending data to child process2
childProcess2.send("Data sent to process2 from main");

//Listening for message from child process1
childProcess1.on('message', message => {
  console.log("Message received by main from process1: ", message);
});

//Listening for message from child process2
childProcess2.on('message', message => {
  console.log("Message received by main from process2: ", message);
});


//MongoDB Atlas URL
const CONNECTION_URL= 'mongodb+srv://thaparikki:rohitthapa2120@cluster0.xikx7.mongodb.net/memories?retryWrites=true&w=majority';

//Connected Express App to MongoDB Atlas
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(()=> {
    app.listen(PORT, () => { //Created an HTTP Server
      console.log("\nServer is running on PORT: ", PORT);
      console.log("\nDatabase is connected\n");
    });
  }).catch((err)=> console.log(err.message));