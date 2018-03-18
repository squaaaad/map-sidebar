instrument = require('node-statsd-instrument');

const instruments = function() {
  statsd_client = new instrument.StatsD('127.0.0.1', 8125);
  statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

  //timing
  //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
  statsd_instrument.measure(this, 'findOneRestaurant', 'server.db_mongoose_contoller_time')

  //counting
  //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
  statsd_instrument.count(this, 'findOneRestaurant', 'server.db_mongoose_controller_count')
}

module.exports = instruments;