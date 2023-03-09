const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const scanProducts = async () => {
    const scanResults = await dynamo.scan({ TableName: process.env.PRODUCTS_TABLE }).promise();
    return scanResults.Items;
}

const queryProduct = async (id) => {
    const queryResults = await dynamo.query({
        TableName: process.env.PRODUCTS_TABLE,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id }
    }).promise();

    return queryResults.Items;
}

const putProduct = async (item) => {
    const putResults = await dynamo.put({ TableName: process.env.PRODUCTS_TABLE, Item: item }).promise();
    return putResults
}

const scanStock = async () => {
    const scanResults = await dynamo.scan({ TableName: process.env.STOCK_TABLE }).promise();
    return scanResults.Items;
}

const queryStock = async (productId) => {
    const queryResults = await dynamo.query({
        TableName: process.env.STOCK_TABLE,
        KeyConditionExpression: 'product_id = :productId',
        ExpressionAttributeValues: { ':productId': productId }
    }).promise();

    return queryResults.Items;
}

const putStock = async (item) => {
    const putResults = await dynamo.put({ TableName: process.env.STOCK_TABLE, Item: item }).promise();
    return putResults
}

module.exports = {
    scanProducts, queryProduct, putProduct, scanStock, queryStock, putStock
}