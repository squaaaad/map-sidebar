const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || '6379';
const CACHE_TIME = process.env.CACHE_TIME || 6;

const client = redis.createClient(REDIS_PORT);

//client.setex('key', CACHE_TIME, 'value');


const makeResponseCache =  (getKey) => {

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
    client.set(key, JSON.stringify(res.locals.addToCache));
  }

  return {check: retrieve, add: insert} ;


}

module.exports.makeResponseCache = makeResponseCache;