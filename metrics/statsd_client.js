instrument = require('node-statsd-instrument');
statsd_server = process.env.STATSD_SERVER || '127.0.0.1';
statsd_port = process.env.STATSD_PORT || 8125;

let statsd_client = null;
if(!process.env.NOSTATS) {
  let d = new Date();
  let id = Math.round(d.getTime() / 1000);
  id = id.substr(id.length > 5 ? id.length - 5 : id);
  statsd_client = new instrument.StatsD(statsd_server, statsd_port);
  statsd_client.loggerID = id;
  console.log('instrument logging to', statsd_server, ":", statsd_port, "loggingID: " statsd_client.loggerID);
}

module.exports = statsd_client;
