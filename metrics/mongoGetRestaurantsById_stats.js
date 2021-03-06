instrument = require('node-statsd-instrument');
statsd_client = require('./statsd_client.js');

const instruments = function() {
  if (statsd_client !== null) {
    console.log('db controller logging stats');
    statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

    //timing
    //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
    statsd_instrument.measure(this, 'findOneRestaurant', 'server.db_mongoDB_contoller_time');

    //counting
    //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
    statsd_instrument.count(this, 'findOneRestaurant', 'server.db_mongoDB_controller_count');
  }
}

module.exports = instruments;