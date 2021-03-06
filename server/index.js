var express = require('express');
var app = express();

var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');
var redis = require('../cache/redis.js');

app.use(cors());
app.use(bodyParser.json());
//app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

app.get('/restaurants/:id/bundle.js', (req, res) => {
  res.sendFile(path.resolve('client/dist/bundle.js'));
});

app.get('/ping', (req, res) => (res.send('pong')));

app.use('/restaurants', restaurantsRouter);

//app.use('/api/restaurants/:id/sidebar', redisHandler);
app.use('/api/restaurants/:id/sidebar', redis.cachedRequestHandler(restaurantsApiRouter.reqHandlers.sidebarHandler));



var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
