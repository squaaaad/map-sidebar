instrument = require('node-statsd-instrument');

const instruments = function() {
  statsd_client = new instrument.StatsD('127.0.0.1', 8125);
  statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

  statsd_instrument.measure(this, '_cachedHandler', 'redis.retrieve_time');
  statsd_instrument.count(this, '_cachedHandler', 'redis.retrieve_Count');
 }

module.exports = instruments;