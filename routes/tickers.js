const express= require('express');
const {getTickers} = require('../api/api');



const router= express.Router();

router.get('/tickers', (req,res,next) => {
  
  const symbols = req.query.symbols;
  console.log("getTickers: ", getTickers);
  console.log("Symbol: ", symbols);
  // res.send("<h1>Hello from Ticker Route</h1>");
  // res.send(getTickers(symbols));
  getTickers(symbols).then((tickers)=> {
    // console.log("Calling get Ticker Method");
    res.send(tickers);
  });
});

module.exports= router;