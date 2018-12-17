const Shopify = require('shopify-api-node');

const SHOP_NAME = 'rule-1-proteins.myshopify.com';
const SHOP_API_KEY = 'b26ca5f03724c92805917e79fe063697';
const SHOP_PASSWORD = '56efbf2275ff618cab490ca3f218b6fb';

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME || SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY || SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD || SHOP_PASSWORD
});

async function createBundle(items) {
  const stack = items.stack;
  const sku = items.sku;
  const price = items.price;
  const image = items.imgSrc;
  const products = items.products;
  const productsLen = products.length;
  let productWithVariants = [];
  for (let i = 0; i < productsLen; i++) {
    let obj = {
      title: products[i].productTitle,
      variant: products[i].variantName,
      productId: products[i].productId,
      variantId: products[i].variantId
    };
    productWithVariants.push(obj);
  }
  try {
    let bundle = await createProduct({
      title: stack+" Bundle",
      product_type: "Bundled Stack",
      vendor: "R1 Bundle",
      body_html: JSON.stringify(productWithVariants),
      variants: [{
        "price": price,
        "sku": sku
      }],
      images: [{
        "src": image
      }]
    });
    return bundle;
  } catch (e) {
    console.log('Error creating a product');
  }
}

async function createProduct(data) {
  try {
    let product = await shopify.product.create(data)
      .then(response => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
    return product;
  } catch (e) {
    console.log('Error creating a product');
  }
}

async function deleteBundle(lineItems) {
  lineItems.forEach(async (item) => {
    const vendor = item.vendor;
    const productId = item.product_id;
    if (vendor.indexOf('R1 Bundle') > -1) {
      deleteProduct(productId);
    }
  });
}

function deleteProduct(productId){
  shopify.product.delete(productId)
  .catch(err => {
    console.log(err);
  });
}

module.exports.createBundle = createBundle;
module.exports.deleteBundle = deleteBundle;
