instrument = require('node-statsd-instrument');
statsd_client = require('./statsd_client.js');


const instruments = function() {
  if(statsd_client) {
    console.log('redis logging stats');
    statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

    statsd_instrument.measure(this, '_cachedHandler', 'redis.retrieve_time');
    statsd_instrument.count(this, '_cachedHandler', 'redis.retrieve_Count');
  }
}

module.exports = instruments;