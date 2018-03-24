instrument = require('node-statsd-instrument');
statsd_server = process.env.STATSD_SERVER || '127.0.0.1';
statsd_port = process.env.STATSD_PORT || 8125;

const instruments = function() {
  if (!process.env.NOSTATS) {
    statsd_client = new instrument.StatsD(statsd_server, statsd_port);
    statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

    //timing
    //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
    statsd_instrument.measure(this, 'findOneRestaurant', 'server.db_postgres_contoller_time')

    //counting
    //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
    statsd_instrument.count(this, 'findOneRestaurant', 'server.db_postgres_controller_count')
  }
}

module.exports = instruments;