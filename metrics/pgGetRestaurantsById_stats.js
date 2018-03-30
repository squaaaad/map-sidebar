instrument = require('node-statsd-instrument');
statsd_client = require('./statsd_client.js');

const instruments = function() {
  if(statsd_client !== null) {
    statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

    //timing
    //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
    statsd_instrument.measure(this, 'findOneRestaurant', 'server_'+ statsd_client.loggerID +'.db_postgres_contoller_time')

    //counting
    //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
    statsd_instrument.count(this, 'findOneRestaurant', 'server_'+ statsd_client.loggerID +'.db_postgres_controller_count')
  }
}

module.exports = instruments;