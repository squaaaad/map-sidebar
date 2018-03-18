var express = require('express');
var router = express.Router();
var instruments = require('../../metrics/stats.js').bind(this);
//var getRestaurantById = require('../../db/controllers/getRestaurantById.js'); //not sure if this works with .findOneRestuarant ??
var getRestaurantById = require('../../db/controllers/pgGetRestaurantsById.js');
//var getRestaurantById = require('../../db/controllers/mongoGetRestaurantsById.js');

reqHandlers = {
  sidebarHandler: function(req, res) {
    var restaurantId = req.params.id;
    getRestaurantById.findOneRestaurant(restaurantId).then((result) => {
      res.send(result);
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
