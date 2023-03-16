const csv = require('csv-parser');

module.exports.processFile = (fileStream) => {
  return new Promise((resolve, reject) => {
    fileStream
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => { console.log(data); })
      .on('error', (error) => {
        console.log({ error });

        reject({
          statusCode: 500,
          error
        });
      })
      .on('end', () => {
        resolve({
          statusCode: 200,
          message: 'the file has been parsed'
        });
      });
  });
}