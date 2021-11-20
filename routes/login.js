const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const redirectURI = process.env.REDIRECT_URI;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

router.get('/', function(req, res, next) {
  res.status(200).send({ redirectURI, clientID });
});

router.get('/:code', function(req, res, next) {

  const code = req.params.code || null;

  if (code) {
    axios.post(`https://www.teamwork.com/launchpad/v1/token.json`, {    
      "code": code,
      "client_secret": clientSecret,
      "redirect_uri": redirectURI,
      "client_id": clientID,
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  }
});

module.exports = router;