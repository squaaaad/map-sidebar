const instrument = require('node-statsd-instrument');
const statsd_server = process.env.STATSD_SERVER || '127.0.0.1';
const statsd_port = process.env.STATSD_PORT || 8125;
const id = process.env.LOGGER_ID.toString() || '1';

let statsd_client = null;
if(!process.env.NOSTATS) {
  statsd_client = new instrument.StatsD(statsd_server, statsd_port);
  statsd_client.loggerID = id;
  console.log('instrument logging to', statsd_server, ":", statsd_port, "loggingID: " statsd_client.loggerID);
}

module.exports = statsd_client;
