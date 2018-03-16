const pgClient = require('pg');
const promise = require('bluebird');
const _ = require('lodash');

process.env.PGHOST = process.env.DATABASE_HOST || 'localhost';
process.env.PGPORT = process.env.DATABASE_PORT || '5432';


var db  = new pgClient();

await db.connect();

const applySchema = (place, openHours) {
  return {
    result: {
      _id: place._id,
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address,
      international_phone_number: place.international_phone_number,
      website: place.website,
      url: place.url,
      opening_hours: {
        open_now: place.open_now,
        periods: _.map(openHours, (period) => {
          return {
            _id: period._id,
            close: {
              day: period.closeday,
              time: period.closetime
            },
            open: {
              day: period.openday,
              time: period.opentime
            }
          };
        }),
        weekday_text: _.map(openHours, (period) => (period.weekday_text))
      },
      geometry: {
        location: {
          lat: place.lat,
          lng: place.lon,
        }
      }
    }
  };

}

const find = (queryObj) => {

}

const findOne = (id) => {
  return db.query('SELECT * FROM places WHERE place_id = $1', [id])
  .then((place) => {
    return db.query('SELECT * FROM openhours WHERE place_id = $1 ORDER BY openday', [id])
    .then((openhours) => {
      return applySchema(place[0], openhours);
    })
    .catch((error) => {
      console.log('pg query error:', error);
    })
  });
}

const insert = () => {};
const remove = () => {};
const count = () => {};


exports.findRestaurants = find;
exports.findOneRestaurant = findOne;
exports.insert = null;
exports.remove = null;
exports.count = null;


