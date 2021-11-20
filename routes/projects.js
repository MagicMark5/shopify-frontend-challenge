const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const apiEndPoint = process.env.API_ENDPOINT;

// get all projects
router.get('/:token', function(req, res, next) {
  const token = req.params.token || null;

  if (apiEndPoint && token) {
    axios.get(`${apiEndPoint}projects.json`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
      res.status(200).send(response.data.projects);
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

// retrieve a single project by id
router.get('/:id/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}projects/${id}.json`, {
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

// get all tasks inside a project
router.get('/:id/tasks/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}projects/${id}/tasks.json`, {
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

// get all of the project's task lists
router.get('/:id/tasklists/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}projects/${id}/tasklists.json`, {
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