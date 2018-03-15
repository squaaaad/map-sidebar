const fakerData = require('./fakerData.js');
const path = require('path');
const Promise = require('bluebird');
const appendFilePromise = Promise.promisify(require('fs').appendFile);
const fs = require('fs');


const writeData = async (n) => {
  let filename = path.join(__dirname, 'fakerData.json');
  fs.writeFileSync(filename, '');
  for (var i = 0; i < n; i++) {
    let lineText = JSON.stringify(fakerData.fakeItem(i, 0));
    if (i !== n - 1) {
      lineText += '\n';
    }
    await appendFilePromise(filename, lineText, 'utf8')
    .then((results) => {
      if(i % 100000 === 0) {
        console.log('wrote', i + 1, 'lines');
      }
    })
    .catch((err) => {  
      console.log(err);
    });
  }
  console.log('successfully wrote file');
}

writeData(10000000);

//when done run: mongoimport -h 127.0.0.1:27017 --db wegot-sidebar --collection restaurants --drop --file seedDB/fakerData.json