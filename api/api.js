const axios= require('axios');
const ticker= require('../models/tickers');

const URL = 'https://api-pub.bitfinex.com/v2';

// https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD

const getTickers = async (symbols) => {
  const {data} = await axios.get(`${URL}/tickers?symbols=${symbols}`);
  let tickersArray=[];
  for(let i=0; i<data.length; i++)
  {
    const [SYMBOL,BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW]= data[i];

    const tickerData={SYMBOL,BID, BID_SIZE, ASK, 
    ASK_SIZE,DAILY_CHANGE, DAILY_CHANGE_RELATIVE, LAST_PRICE, VOLUME, HIGH,LOW};

    console.log(tickerData);

    const newTicker= new ticker(tickerData);

    try {
         await newTicker.save();

         tickersArray.push(tickerData);
    } catch (error) {
        console.log("Error message: ", error);
    }
  }
  // console.log(tickersArray);
  return tickersArray;
};

module.exports= getTickers;