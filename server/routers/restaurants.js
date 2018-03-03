var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.set({ 'Access-Control-Allow-Origin': '*' })
  res.send('This endpoint will send a restaurant json');
});

module.exports = router;
