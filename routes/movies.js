const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const omdbApiKey = process.env.API_KEY;

router.get('/search/:title', function(req, res, next) {

  const movieQuery = req.params.title ? req.params.title : "";

  if (movieQuery) {
    axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movieQuery}&type=movie&page=1`)
    .then(response => {
      res.status(200).send(response.data)
    })
    .catch(error => {
      res.status(500).send(error)
    })
  } else {
    res.status(404).send("Page not found")
  }

});

router.get('/:imdbID', function(req, res) {

  const imdbID = req.params.imdbID;

  axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbID}&type=movie&page=1`)
  .then(response => {
    console.log("omdb api call successful with ", imdbID);
    res.status(200).send(response.data)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

module.exports = router;