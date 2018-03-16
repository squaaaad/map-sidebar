var express = require('express');
var router = express.Router();
//var getRestaurantById = require('../../db/controllers/getRestaurantById.js'); //not sure if this works with .findOneRestuarant ??
var getRestaurantById = require('../../db/controllers/pgGetRestaurantById.js');

router.get('/:id/sidebar', (req, res) => {
  var restaurantId = req.params.id;
  getRestaurantById.findOneRestaurant(restaurantId).then((result) => {
    res.send(result);
  });
});

module.exports = router;
