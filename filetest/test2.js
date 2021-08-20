const http = require('http');

// http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res);
//   }
// }).listen(3000);


const fs = require('fs');
const path = require('path');

const filePath1 = path.resolve(__dirname, 'data.txt');
const filePath2 = path.resolve(__dirname, 'bak.txt');

const readStream = fs.createReadStream(filePath1);
const writeStream = fs.createWriteStream(filePath2);

readStream.pipe(writeStream);