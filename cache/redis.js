const redis = require('redis');
const instruments = require('../metrics/redis_stats.js').bind(this);

const REDIS_PORT = process.env.REDIS_PORT || '6379';
const CACHE_TIME = process.env.CACHE_TIME || 6;

const client = redis.createClient(REDIS_PORT);

let requestHandler = null;

const cachedRequestHander(reqHander) => {
  return this._cachedHandler.bind(this, reqHander);
}

const cacheResponse (res, key) => {
  const methods = ["send", "end", "json"];

  const interceptRes = function (method) {
    let originalMethod = res[method];
    return function () {
      originalMethod.apply(this, arguments);
      let data = arguments[0];
      if (method === "json"){
        data = JSON.stringify(data);
      }
      client.set(key, data);
    }
  }

  for (var i = 0; i < methods.length; i++) {
    res[methods[i]] = interceptRes(methods[i]);
  }

  return res;
}


const cachedHandler = (requestHandler, req, res, next) => {
  const key = req.url;
  client.get(key, (err, data) => {
    if (err) {
      console.log (err);
    }
    if (data != null) {
      console.log('retrieved cached data');
      res.send(JSON.parse(data));
    } else {
      requestHandler(req, cacheResponse(res, key), next);
    }
  });
}

module.exports._cachedHandler = cachedHandler;
module.exports.cachedRequestHander = cachedRequestHander;

instruments();
