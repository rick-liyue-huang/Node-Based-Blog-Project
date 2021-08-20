const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {runOnChangeOnly} = require("nodemon/lib/config/defaults");

const fullFilePath = path.resolve(__dirname, '../', '../', 'logs', 'access.log');

// create readstream
const readStream = fs.createReadStream(fullFilePath);

// create readline
const rline = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;
// read file
rline.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  sum++;

  const arr = lineData.split((' -- '));
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++;
  }
});

rline.on('close', () => {
  console.log('chrome ratio: ' + chromeNum / sum);
});