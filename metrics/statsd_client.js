instrument = require('node-statsd-instrument');
statsd_server = process.env.STATSD_SERVER || '127.0.0.1';
statsd_port = process.env.STATSD_PORT || 8125;

let statsd_client = null;
if(!process.env.NOSTATS) {
  statsd_client = new instrument.StatsD(statsd_server, statsd_port);
  console.log('instrument logging to', statsd_server, ":", statsd_port);
}

module.exports = statsd_client;