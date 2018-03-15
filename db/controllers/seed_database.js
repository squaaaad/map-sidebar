//var data = require('../../restaurants_data_random.js');
const fakerData = require('../../seedDB/fakerData.js');
const database = require('../models/restaurant.js');


const insertData = async (n, chunk) => {
  for (var i = 0; i < n; i++) {
    let data = fakerData.fakeData(chunk, i * chunk);
    await database.insert(data)
      .then((response) => {
        console.log('inserted', chunk, 'items');
        //database.mongoose.disconnect();
      })
      .catch((err) => {
        console.error('Failed to seed database');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);
        //database.mongoose.disconnect();
      });
      //console.log(i);
  }
  console.log('successfully seeded database');
}

insertData(1, 1000);


