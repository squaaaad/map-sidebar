var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var db = mongoose.connect('mongodb://localhost/wegot');

var restaurantSchema = mongoose.Schema({
  result: {
    place_id: { type: String, unique: true },
    opening_hours: {
      open_now: Boolean,
      periods: [
        {
          close: {
            day: Number,
            time: String
          },
          open: {
            day: Number,
            time: String
          }
        }
      ],
      weekday_text: [String]
    },
    formatted_address: String,
    international_phone_number: String,
    website: String,
    url: String
  }
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);


var find = (queryObj) => {
  return Restaurant.find(queryObj);
};

var insert = (documents) => {
  return Restaurant.insertMany(documents);
};

var remove = (queryObj) => {
  return Restaurant.remove(queryObj);
};

exports.find = find;
exports.insert = insert;
exports.remove = remove;
exports.mongoose = mongoose;
