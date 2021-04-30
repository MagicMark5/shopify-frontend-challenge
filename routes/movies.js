import axios from "axios";
const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
  console.log("HELLO: ", req.body);
  const movie = req.body.movie
  res.status(202).send(movie)
});

module.exports = router;