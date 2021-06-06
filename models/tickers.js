const mongoose = require('mongoose');

const tickerSchema= mongoose.Schema({
    SYMBOL: String,
    BID: Number, 
    BID_SIZE: Number, 
    ASK: Number, 
    ASK_SIZE: Number, 
    DAILY_CHANGE: Number, 
    DAILY_CHANGE_RELATIVE: Number, 
    LAST_PRICE: Number, 
    VOLUME: Number, 
    HIGH: Number, 
    LOW:Number
});

const ticker= mongoose.model('ticker', tickerSchema);

module.exports= ticker;