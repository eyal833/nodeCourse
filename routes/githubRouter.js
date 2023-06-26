const express = require('express');
const githubRouter = express.Router();

// Define routes for the '/github' path
githubRouter.get('/', (req, res) => {
  res.send('GET /github');
});

githubRouter.get('/callback', (req, res) => {
    res.send('GET /github/callback');
});

module.exports = githubRouter;