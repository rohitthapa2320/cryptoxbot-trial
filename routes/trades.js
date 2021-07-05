const express= require('express');
const {getTrades} = require('../api/api');

const router= express.Router();

router.get('/tBTCUSD/hist', (req,res,next) => {
  console.log(req.path);
  const path= req.path;
  getTrades(path).then((response) => {
    console.log("TradeData:", response);
    res.send(response);
  });
});

module.exports= router;