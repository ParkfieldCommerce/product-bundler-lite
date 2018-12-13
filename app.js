const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config;
const shopifyRouter = require('./routes/shopify-api');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/status', (req,res) =>{
  res.send('We are Live');
  res.end();
});

app.use(shopifyRouter);

//Start Server
app.listen(process.env.NODE_ENV || 3000, function(){
  console.log('Server is started on port 3000');
});

module.exports = app;
