var express = require('express');
var app = express();

var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

app.get('/', (req, res) => {
  res.redirect('/restaurants/ChIJP5PrLYSAhYARBcWhJXs55P4');
});
app.use('/restaurants', restaurantsRouter);
app.use('/api/restaurants', restaurantsApiRouter);



var port = process.env.PORT || 3000;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
