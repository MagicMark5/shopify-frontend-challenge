const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const apiEndPoint = process.env.API_ENDPOINT;

// get all tasklists across all projects
router.get('/:token', function(req, res, next) {
  const token = req.params.token || null;

  if (apiEndPoint && token) {
    axios.get(`${apiEndPoint}tasklists.json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      res.status(200).send(response.data);
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

// retrieve a single tasklist
router.get('/:id/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}tasklists/${id}.json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      res.status(200).send(response.data);
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

// update a tasklist by id
router.put("/:id/:token", (request, response) => {
  console.log(request.body);
  console.log(request.params);
});

// Get all tasks on a given tasklist
router.get('/:id/tasks/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}tasklists/${id}/tasks.json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      res.status(200).send(response.data);
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