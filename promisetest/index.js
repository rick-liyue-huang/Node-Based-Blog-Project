
const fs = require('fs');
const path = require('path');

const fullFilePath =  path.resolve(__dirname, 'files', 'a.json');
fs.readFile(fullFilePath, (err, data) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(data.toString());
});

function getFileContent(fileName, callback) {
  const fullFilePath =  path.resolve(__dirname, 'files', fileName);
  fs.readFile(fullFilePath, (err, data) => {
    if (err) {
      console.log(err);
      return
    }
    callback(JSON.parse(data.toString()));
  });
}

// getFileContent('a.json', aData => {
//   console.log('a data', aData);
//   getFileContent(aData.next, bData => {
//     console.log('b data', bData);
//     getFileContent(bData.next, cData => {
//       console.log('c data', cData);
//     })
//   })
// })

function getFileContent1(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFilePath =  path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFilePath, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

getFileContent1('a.json').then(aData => {
  console.log(aData);
  return getFileContent1(aData.next)
}).then(bData => {
  console.log(bData);
  return getFileContent1(bData.next)
}).then(cData => {
  console.log(cData)
})
