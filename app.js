const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const shopifyRouter = require('./routes/shopify-api');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use('/shopify', shopifyRouter);

app.get('/status', (req,res) =>{
  res.send('We are Live');
  res.end();
});

app.post('/build-product', (req, res) => {
  res.send(req.body.products);
  console.log('Req', req);
});

//Start Server
app.listen(process.env.NODE_ENV || 3000, function(){
  console.log('Server is started on port 3000');
});

module.exports = app;
