const ws = require('ws');
const w = new ws('wss://api-pub.bitfinex.com/ws/2');

const Trade= require('../models/trades');

const obj = { event: 'subscribe', channel: 'trades', symbol: 'tBTCUSD'};

let msg = JSON.stringify(obj);

// let debugCount=0;

w.on('message', (message) => {
  console.log(`Message:`, message);
  console.log(message.length);
  console.log(typeof(message));

  const data= JSON.parse(message);

  // var obj = JSON.parse(JS_Obj); 
  // var res = []; 

  // for(var i in obj) 
  //     res.push(obj[i]);

  console.log("Type of data:", typeof(data));
  console.log("Data :", data );
  

  // if(typeof(data) === "object"){
  //   console.log();
  //   return;
  // }

  if(data.event === 'info'){
    console.log(`Error : Subscription data from API`);
    return;
  }

  if(data.event === 'subscribed'){
    console.log(`Error : Subscription data from API`);
    return;
  }

  if(data[1] === "hb"){
    // console.log(`Error : hb data from API`);
    return;
  }

  if(data[1] === "tu"){
    // console.log(`Error : tu data from API`);
    return;
  }

  if(message.length > 150)
    return;

  if(data.event !== 'subscribed' && data.event !== 'info' && data[1] !== "hb" && message.length<=150 && data[1] !== "tu"){
    const [TRADE_ID, MTS, AMOUNT, PRICE]= data[2];
  
    const tradeData={SYMBOL: obj.symbol,UPDATE_CODE: data[1],TRADE_ID,MTS, AMOUNT, PRICE,CREATE_TIME: Date.now()};
  
      console.log(`trade Data:`, tradeData);

      console.log("\nStoring in the Database\n");

      try {
        Trade.create(tradeData);
      } catch (error) {
        // debugCount++;
        // if(debugCount > 4)
        //   process.exit();
          console.log("Error message: ", error);
      }
  }
});


w.on('open', () => {
  w.send(msg);
});