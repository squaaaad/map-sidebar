var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
databaseHost = process.env.DATABASE_HOST || '127.0.0.1';
var db = mongoose.connect('mongodb://' + databaseHost + '/wegot-sidebar');

var restaurantSchema = mongoose.Schema({
  result: {
    place_id: { type: String, unique: true },
    name: String,
    formatted_address: String,
    international_phone_number: String,
    website: String,
    url: String,
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
    geometry: {
      location: {
        lat: Number,
        lng: Number
      }
    }
  }
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);


var find = (id) => {
  return Restaurant.find({ 'result.place_id': id });
};

var findOne = (id) => {
  return Restaurant.find({ 'result.place_id': id }).limit(1);
};

var insert = (documents) => {
  return Restaurant.insertMany(documents);
};

var remove = (queryObj) => {
  return Restaurant.remove(queryObj);
};

var count = (queryObj) => {
  return Restaurant.count(queryObj);
};

//database functions
exports.findRestaurants = find;
exports.findOneRestaurant = findOne;
exports.insert = insert;
exports.remove = remove;
exports.count = count;

//misc objects for testing and database seeding
exports.Restaurant = Restaurant;
exports.mongoose = mongoose;
