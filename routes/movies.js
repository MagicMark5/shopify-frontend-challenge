const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const omdbApiKey = process.env.API_KEY;

router.post('/', function(req, res, next) {

  const movieQuery = req.body.movie ? req.body.movie : "";

  if (movieQuery) {
    axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movieQuery}&type=movie&page=1`)
    .then(response => {
      res.status(202).send(response.data)
    })
    .catch(error => {
      res.status(502).send(error)
    })
  } else {
    res.status(404).send("Page not found")
  }

});

router.post('/:imdbID', function(req, res) {

  const imdbID = req.body.imdbID;

  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbID}&type=movie&page=1`)
  .then(response => {
    console.log("omdb api call successful with ", imdbID);
    res.status(202).send(response.data)
  })
  .catch(error => {
    res.status(502).send(error)
  })
})

module.exports = router;