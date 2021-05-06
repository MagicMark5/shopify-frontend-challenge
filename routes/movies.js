const express = require('express');
const axios = require("axios");
const router = express.Router();

require('dotenv').config();
const omdbApiKey = process.env.API_KEY;

router.post('/', function(req, res, next) {

  const movieQuery = req.body.movie;

  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movieQuery}&type=movie&page=1`)
    .then(response => {
      console.log("omdb api call successful with ", movieQuery);
      res.status(202).send(response.data)
    })
    .catch(error => {
      res.status(502).send(error)
    })


});

module.exports = router;