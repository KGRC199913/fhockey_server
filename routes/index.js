const express = require('express');
const indexRoute = express.Router();

/* GET home page. */
indexRoute.get('/', function(req, res, next) {
  return res.json(
    {
      data : "success",
      error: null
    }
  )
});

module.exports = {
  indexRoute 
};
