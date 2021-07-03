const ws = require('ws');
const w = new ws('wss://api-pub.bitfinex.com/ws/2');

const obj = { event: 'subscribe', channel: 'ticker', symbol: 'tBTCUSD'};

let msg = JSON.stringify(obj);

let debugCount=0;

w.on('message', (message) => {
  console.log(`Message:`, message);
  const [BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW]= message[1];

  const tickerData={SYMBOL: obj.symbol,BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW};

    console.log(`ticker Data:`, tickerData);

    
    
    try {
      Ticker.create(tickerData);
    } catch (error) {
      
      debugCount++;
      if(debugCount > 2)
        process.exit();

        console.log("Error message: ", error);
    }
});


w.on('open', () => {
  w.send(msg);
});