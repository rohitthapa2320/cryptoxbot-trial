const axios= require('axios');
// const ticker= require('../models/tickers');

const Ticker= require('../models/tickers');
const Trade= require('../models/trades');

const URL = 'https://api-pub.bitfinex.com/v2';

// https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD

const getTickers = async (symbols) => {
  const url= `${URL}/tickers?symbols=${symbols}`;
  // console.log("URL: ",url);
    const {data} = await axios.get(url);
    // console.log("API RESPONSE: ",data);
  let tickersArray=[];
  for(let i=0; i<data.length; i++)
  {
    const [SYMBOL,BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW]= data[i];

    const tickerData={SYMBOL,BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW, CREATE_TIME: Date.now()};

    console.log(tickerData);

    // const newTicker= new ticker(tickerData);

    try {
        //  await newTicker.save();

        Ticker.create(tickerData);

         tickersArray.push(tickerData);
    } catch (error) {
        console.log("Error message: ", error);
    }

    // Ticker.create({SYMBOL,BID, BID_SIZE, ASK, 
    // ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW})
    // .then((result) => {
    //   console.log(result);
    // }).catch((err) => {
    //   console.log(err);
    // });


  }
  console.log(tickersArray);
  return tickersArray;
};

const queryParams = 'limit=1&sort=-1';
const getTrades = async (path) => {
  const {data}= await axios.get(`${URL}/trades${path}?${queryParams}`);

  const [TRADE_ID, MTS, AMOUNT, PRICE]= data[0];

  const tradeData= {SYMBOL: 'tBTCUSD', TRADE_ID, MTS, AMOUNT, PRICE, CREATE_TIME: Date.now()};

  try {
    Trade.create(tradeData);    
  } catch (error) {
    console.log("Error Message:", error);
  }

  return tradeData;
}

module.exports= {getTickers, getTrades};
