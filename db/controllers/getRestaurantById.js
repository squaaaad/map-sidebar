var database = require('../models/restaurant.js');

module.exports = (id) => {
  return database.findOneRestaurant(id)
    .then((result) => {
      return result[0];
    })
    .catch((error) => (console.log(error)));
};
