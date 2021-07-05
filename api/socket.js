const ws = require('ws');
const w = new ws('wss://api-pub.bitfinex.com/ws/2');

const Ticker= require('../models/tickers');

const obj = { event: 'subscribe', channel: 'ticker', symbol: 'tBTCUSD'};

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
    console.log(`Error : hb data from API`);
    return;
  }

  if(data.event !== 'subscribed' && data.event !== 'info' && data[1] !== "hb"){
    const [BID, BID_SIZE, ASK, 
      ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW]= data[1];
  
    const tickerData={SYMBOL: obj.symbol,BID, BID_SIZE, ASK, 
      ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW, CREATE_TIME: Date.now()};
  
      console.log(`ticker Data:`, tickerData);

      console.log("\nStoring in the Database\n");

      try {
        Ticker.create(tickerData);
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