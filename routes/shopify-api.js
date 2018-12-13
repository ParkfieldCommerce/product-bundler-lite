const express = require('express');
const router = express.Router();
const ShopifyFunctions = require('../scripts/shopify-functions.js');

router.post('/build-product', async (req, res) => {
  console.log('==============Building Product!==============');
  const items = req.body;
  const createdProduct = await ShopifyFunctions.createBundle(items);
  res.send(JSON.stringify(createdProduct));
});

module.exports = router;
