const express= require('express');
const getTickers = require('../api/api');

const router= express.Router();

router.get('/tickers', (req,res,next) => {
  const symbols = req.query.symbols;
  getTickers(symbols).then((tickers)=> {
    res.send(tickers);
  });
});

module.exports= router;