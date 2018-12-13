const express = require('express');
const router = express.Router();
const ShopifyFunctions = require('../scripts/shopify-functions.js');

router.post('/build-product', async (req, res) => {
  console.log('==============Building Product!==============');
  const items = req.body;
  const createdProduct = await ShopifyFunctions.createBundle(items);
  res.send(JSON.stringify(createdProduct));
});

router.post('/order-created', async (req, res) => {
  console.log('================Order Created!================');
  console.log(req);
});

module.exports = router;
