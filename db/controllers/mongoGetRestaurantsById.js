const mongo = require('mongodb').MongoClient;
const promise = require('bluebird');
const _ = require('lodash');

const dbIP = process.env.DATABASE_HOST || 'localhost';
const dbPort = process.env.DATABASE_PORT || '27017';
const dbName = 'wegot-sidebar';
const dbURL = 'mongodb://' + dbIP + ':' + dbPort + '/' + dbName;

let db  = null;
let restaurants = null;

const connect = async () => {
  const client = await mongo.connect(dbURL);
  db = client.db(dbName);
  restaurants = db.collection('restaurants')
}



const find = (queryObj) => {

}

const findOne = (id) => {
  //console.log(restaurants);
  return restaurants.find({'result.place_id': id}).limit(1).toArray().then((results) => results[0]);
}

const insert = () => {};
const remove = () => {};
const count = () => {};


//on import:
connect()
.then(() => ('connected to database', dbName))
.catch((err) => (console.log(err)));


exports.findRestaurants = find;
exports.findOneRestaurant = findOne;
exports.insert = null;
exports.remove = null;
exports.count = null;


