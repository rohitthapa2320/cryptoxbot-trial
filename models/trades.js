//TRADE MODEL USING MySQL

const Sequelize= require('sequelize');

const sequelize = require('../utils/database');

const Trade = sequelize.define('trades', {
    id:{
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true
    },
    SYMBOL: Sequelize.STRING,
    UPDATE_CODE: Sequelize.STRING,
    TRADE_ID: Sequelize.INTEGER,
    MTS: Sequelize.DATE, 
    AMOUNT: Sequelize.DOUBLE, 
    PRICE: Sequelize.DOUBLE, 
    CREATE_TIME:Sequelize.DATE  
});

module.exports= Trade;












// MODEL USING MONGODB

// const mongoose = require('mongoose');

// const tickerSchema= mongoose.Schema({
//     SYMBOL: String,
//     BID: Number, 
//     BID_SIZE: Number, 
//     ASK: Number, 
//     ASK_SIZE: Number, 
//     DAILY_CHANGE: Number, 
//     DAILY_CHANGE_RELATIVE: Number, 
//     LAST_PRICE: Number, 
//     VOLUME: Number, 
//     HIGH: Number, 
//     LOW:Number
// });

// const ticker= mongoose.model('ticker', tickerSchema);

// module.exports= ticker;