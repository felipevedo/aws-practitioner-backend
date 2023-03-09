'use strict';

const { scanProducts, queryProduct, putProduct, scanStock, queryStock, putStock } = require('./db');
const { mergeProductWithStock, splitProductWithStock } = require('./utils');

const commonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const getProductsList = async () => {
  const products = await scanProducts();
  const stock = await scanStock();

  const productsWithStock = products.map((product) => {
    const productStock = stock.find(s => s.product_id === product.id);

    return mergeProductWithStock(product, productStock)
  })

  return {
    statusCode: 200,
    headers: commonHeaders,
    body: JSON.stringify(productsWithStock),
  };
};

const getProductsById = async (event) => {
  const productId = parseInt(event.pathParameters.productId);

  const [foundProduct] = await queryProduct(productId);
  const [foundStock] = await queryStock(productId);

  const productWithStock = mergeProductWithStock(foundProduct, foundStock);

  return {
    statusCode: 200,
    headers: commonHeaders,
    body: JSON.stringify(productWithStock),
  };
};

const createProduct = async (event) => {
  const productWithStock = JSON.parse(event.body);
  productWithStock.id = new Date().getTime();

  const { product, stock } = splitProductWithStock(productWithStock);

  await putProduct(product);
  await putStock(stock);

  return {
    statusCode: 200,
    headers: commonHeaders,
    body: JSON.stringify({message: 'Product created successfully'}),
  };
}

module.exports = {
  getProductsList, getProductsById, createProduct
}
