instrument = require('node-statsd-instrument');
statsd_server = process.env.STATSD_SERVER || '127.0.0.1';
statsd_port = process.env.STATSD_PORT || 8125;
const id = process.env.LOGGER_ID.toString() || '1';

const instruments = function() {
  console.log('process.env.NOSTATS', process.env.NOSTATS);
  if (!process.env.NOSTATS) {
    console.log('instrument logging to', statsd_server, ":", statsd_port);
    statsd_client = new instrument.StatsD(statsd_server, statsd_port);
    statsd_instrument = new instrument.StatsDInstrumentation(statsd_client);

    //timing
    //statsd_instrument.measure(restaurants_api, 'router', 'server.dbrequest.time')
    statsd_instrument.measure(reqHandlers, 'sidebarHandler', 'server_'+ id +'.dbrequesthandler.time')

    //counting
    //statsd_instrument.count(restaurants_api, 'router', 'server.dbrequest.count')
    statsd_instrument.count(reqHandlers, 'sidebarHandler', 'server_'+ id +'.dbrequesthandler.count')
  }
}

module.exports = instruments;