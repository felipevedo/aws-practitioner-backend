const csv = require('csv-parser');

const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET,
  region: 'us-east-1'
});

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/637998571991/catalog-items-queue';

module.exports.processFile = async (fileStream) => {
  const requests = [];

  return new Promise((resolve, reject) => {
    fileStream
      .pipe(csv({ separator: ';' }))
      .on('data', async (data) => {
        const params = {
          MessageBody: JSON.stringify(data),
          QueueUrl: QUEUE_URL
        };

        const req = sqs.sendMessage(params);
        requests.push(req);
      })
      .on('error', (error) => {
        console.log({ error });

        reject({
          statusCode: 500,
          error
        });
      })
      .on('end', async () => {
        const promises = requests.map(r => r.promise());

        try {
          const results = await Promise.all(promises);
          console.log(results);
        } catch (err) {
          console.log(err);
        }

        resolve({
          statusCode: 200,
          message: 'the file has been parsed'
        });
      });
  });
}