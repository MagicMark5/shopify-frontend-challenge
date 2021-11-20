const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const apiEndPoint = process.env.API_ENDPOINT;

router.get('/:token', function(req, res, next) {
  const token = req.params.token || null;

  if (apiEndPoint && token) {
    axios.get(`${apiEndPoint}projectCategories.json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      res.status(200).send(response.data.categories);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error)
    })
  }
  else {
    res.status(403).send("Something went wrong with the request. Check the apiEndPoint environment variable or the access token.");
  }  
});


module.exports = router;