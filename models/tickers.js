//TICKER MODEL USING MySQL

const Sequelize= require('sequelize');

const sequelize = require('../utils/database');

const Ticker = sequelize.define('ticker', {
    id:{
        type: Sequelize.INTEGER,
        allowNULL: false,
        autoIncrement: true,
        primaryKey: true
    },
    SYMBOL: Sequelize.STRING,
    BID: Sequelize.DOUBLE, 
    BID_SIZE: Sequelize.DOUBLE, 
    ASK: Sequelize.DOUBLE, 
    ASK_SIZE: Sequelize.DOUBLE, 
    DAILY_CHANGE: Sequelize.DOUBLE, 
    DAILY_CHANGE_RELATIVE: Sequelize.DOUBLE, 
    LAST_PRICE: Sequelize.DOUBLE, 
    VOLUME: Sequelize.DOUBLE, 
    HIGH: Sequelize.DOUBLE, 
    LOW:Sequelize.DOUBLE,
    CREATE_TIME:Sequelize.DATE
});

module.exports= Ticker;












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