'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.ACCESS_ID, secretAccessKey: process.env.SECRET });

const s3 = new AWS.S3({ region: 'us-east-1' });
const BUCKET = 'import-service-store';


module.exports.importProductsFile = async (event) => {
  if (!event.queryStringParameters.name) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'no valid name was provided' }),
    }
  }

  const fileName = event.queryStringParameters.name || '-';
  const uploadsPath = `uploaded/${fileName}`;
  const params = {
    Bucket: BUCKET,
    Key: uploadsPath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  try {
    const url = s3.getSignedUrl('putObject', params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: url,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error }),
    }
  }
};

module.exports.importFileParser = (event) => {
  const fileKey = event.Records[0].s3.object.key || '';

  console.log('fileKey:',fileKey);

  const params = {
    Bucket: BUCKET,
    Key: fileKey
  }

  const s3Stream = s3.getObject(params).createReadStream();

  s3Stream
    .on('data', (data) => { console.log({ data, type: typeof data }); })
    .on('error', (error) => { console.log({ error }); })
    .on('end', () => { 
      return {
        statusCode: 200,
        message: 'FROM WITHIN: the file has been parsed'
      }
     })

  return {
    statusCode: 200,
    message: 'the file has been parsed'
  }
}