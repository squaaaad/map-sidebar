const pg = require('pg');
const promise = require('bluebird');
const _ = require('lodash');
const instruments = require('../../metrics/pgGetRestaurantsById_stats.js').bind(this);

process.env.PGHOST = process.env.DATABASE_HOST || 'localhost';
process.env.PGPORT = process.env.DATABASE_PORT || '5432';
process.env.PGDATABASE = 'wegotsidebar';


const db  = new pg.Client();

const connect = async () => {
  await db.connect();
  console.log('connected to database', process.env.PGDATABASE);
}

const applySchema = (place, openHours) => {
  //console.log('place:', place);
  //console.log('openhours', openHours);
  return {
    result: {
      _id: place.period_id,
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
            //_id: period._id,
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

const findOne = (id) => { //refactor to promise.all, and potentially break apply schema into two methods
  return promise.all([db.query('SELECT * FROM places WHERE place_id = $1', [id]), db.query('SELECT * FROM openhours WHERE place_id = $1 ORDER BY openday', [id])])
  //^Time independently
  .then(([place, openhours]) => {
    return applySchema(place.rows[0], openhours.rows);
  })
  .catch((error) => {
    console.log('pg query error:', error);
  });
}

const insert = () => {};
const remove = () => {};
const count = () => {};

connect();

exports.findRestaurants = find;
exports.findOneRestaurant = findOne;
exports.insert = null;
exports.remove = null;
exports.count = null;

instruments();


