var express = require('express');
var app = express();

var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/', express.static('client/dist'));
app.use('/restaurants', restaurantsRouter);

app.options((req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' });
  res.send('OPTIONS OK');
});

var port = process.env.PORT || 3000;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
