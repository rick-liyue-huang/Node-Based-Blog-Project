const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'data.txt');

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString());
});

const content = 'this is new content';
const opt = {
  flag: 'a'  // w
};
fs.writeFile(filePath, content, opt, (err) => {
  if (err) {
    console.error(err);
  }
});

fs.exists(filePath, (exist) => {
  console.log('exists', exist);
});