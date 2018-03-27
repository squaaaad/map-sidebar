var express = require('express');
var router = express.Router();
var instruments = require('../../metrics/restaurants_api_stats.js').bind(this);

if (process.env.DBMS === 'mongodb') {
  console.log('Connecting to mongodb');
  var getRestaurantById = require('../../db/controllers/mongoGetRestaurantsById.js');
} else if (process.env.DBMS = 'postgresql') {
  console.log('connecting to postgres');
  var getRestaurantById = require('../../db/controllers/pgGetRestaurantsById.js');
} else {
  throw err('No DBMS specified, please set DBMS to mongodb or postgresql');
}

//var getRestaurantById = require('../../db/controllers/getRestaurantById.js'); //not sure if this works with .findOneRestuarant ??


reqHandlers = {
  sidebarHandler: function(req, res, next) {
    var restaurantId = req.params.id;
    getRestaurantById.findOneRestaurant(restaurantId).then((result) => {
      //console.log(res.send.toString());
      //console.log(result);
      res.send(result);
      //res.locals.addToCache = result;
      //next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.end();
    });
  }
};

module.exports.reqHandlers = reqHandlers;

instruments();

//module.exports = router;
