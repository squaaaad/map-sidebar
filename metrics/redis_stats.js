instrument = require('node-statsd-instrument');

const instruments = function() {
  statsd_client = new instrument.StatsD('127.0.0.1', 8125);
  statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

  //timing
  //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
  statsd_instrument.measure(this, 'retrieve', 'redis.retrieve_time');
  statsd_instrument.count(this, 'retrieve', 'redis.retrieve_Count');
  //counting
  //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
  //statsd_instrument2 = new instrument.StatsDInstrumentation(statsd_client);
  statsd_instrument.measure(this, 'insert', 'redis.insert_time');
  statsd_instrument.count(this, 'insert', 'redis.insert_Count');
}

module.exports = instruments;