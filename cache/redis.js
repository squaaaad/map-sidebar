const redis = require('redis');
const instruments = require('../metrics/redis_stats.js').bind(this);

const REDIS_PORT = process.env.REDIS_PORT || '6379';
const CACHE_TIME = process.env.CACHE_TIME || 6;

const client = redis.createClient(REDIS_PORT);

//client.setex('key', CACHE_TIME, 'value');

let getKey = null;
const makeResponseCache =  (reqCallback) => {
  getKey = reqCallback;
}

const retrieve = (req, res, next) => {
  const key = getKey(req, res);
  client.get(key, (err, data) => {
    if (err) {
      console.log (err);
    }
    if (data != null) {
      console.log('retrieved cached data');
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
}

const insert = (req, res, next) => {
  const key = getKey(req, res);
  //console.log('res after send', res);
  if (res.locals.addToCache) {
    client.set(key, JSON.stringify(res.locals.addToCache));
  }
}

module.exports.makeResponseCache = makeResponseCache;
module.exports.retrieve = retrieve;
module.exports.insert = insert;

instruments();
