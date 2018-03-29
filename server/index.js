var express = require('express');
var app = express();

var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');
var redis = require('../cache/redis.js');
var fs = require('fs');

//const indexHTML = fs.readFileSync();

app.use(cors());
app.use(bodyParser.json());
//app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

app.get('/restaurants/:id/bundle.js', redis.cachedRequestHandler((req, res) => {
  res.sendFile(path.resolve('client/dist/bundle.js'));
}));


app.get('/loaderio-2063f06794c9e1e4203112fd58e83795.txt', (req, res) => (res.sendFile(path.resolve('loaderIO/loaderio-2063f06794c9e1e4203112fd58e83795.txt'))));

app.get('/ping', (req, res) => (res.send('pong')));

app.use('/restaurants', redis.cachedRequestHandler(restaurantsRouter));

//app.use('/api/restaurants/:id/sidebar', redisHandler);
app.use('/api/restaurants/:id/sidebar', redis.cachedRequestHandler(restaurantsApiRouter.reqHandlers.sidebarHandler));



var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
