const express = require('express');
const axios = require("axios");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const apiEndPoint = process.env.API_ENDPOINT;

// get all tasks across all projects
// pass in some query parameters to limit results
// e.g. 'filter' (string) "all"
// e.g. 'projectIds' (string) Use this to get back all tasks in a subset of projects (deafult: projectIds="3444475,345345")
// e.g. getSubTasks="yes"
// e.g. nestSubTasks="yes"
router.get('/:token', function(req, res, next) {
  const token = req.params.token || null;

  if (apiEndPoint && token) {
    axios.get(`${apiEndPoint}tasks.json`, {
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

// retrieve a single task by id
router.get('/:id/:token', function(req, res, next) {
  const id = req.params.id || null;
  const token = req.params.token || null;

  if (apiEndPoint && token && id) {
    axios.get(`${apiEndPoint}tasks/${id}.json`, {
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

// update a task by id
router.put("/:id/:token", (request, response) => {
  console.log(request.body);
  console.log(request.params);
});

// For the specified task, creates a sub-task
router.post("/:id/:token", (request, response) => {
  console.log(request.body);
  console.log(request.params);
});


module.exports = router;