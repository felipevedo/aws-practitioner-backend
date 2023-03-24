'use strict';

const { scanProducts, queryProduct, putProduct, scanStock, queryStock, putStock } = require('./db');
const { mergeProductWithStock, splitProductWithStock } = require('./utils');

const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.ACCESS_ID, secretAccessKey: process.env.SECRET, region: 'us-east-1' });
var sns = new AWS.SNS({ apiVersion: '2010-03-31' });

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
};

const catalogBatchProcess = async (event) => {
  const currentBatch = event.Records;
  const productRequests = [];
  const stockRequests = [];

  currentBatch.map((item) => {
    const productWithStock = JSON.parse(item.body);
    productWithStock.id = new Date().getTime();
  
    const { product, stock } = splitProductWithStock(productWithStock);   
    
    productRequests.push(putProduct(product));
    stockRequests.push(putStock(stock));
  });

  try {
    await Promise.all(productRequests);
    await Promise.all(stockRequests);
  } catch (error) {
    console.log(error);
  }

  const snsParams = {
    Message: 'Products created!',
    Subject: 'SNS: products processed',
    TopicArn: process.env.CREATE_PRODUCT_SNS_TOPIC_ARN
  };

  const publishRequest = sns.publish(snsParams);

  try {
    const publishResult = await publishRequest.promise();
    console.log(publishResult);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsList, getProductsById, createProduct, catalogBatchProcess
}
