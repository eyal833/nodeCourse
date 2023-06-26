const express = require('express');
const guestsRouter = express.Router();

guestsRouter.get('/welcome', (req, res) => {
  res.send('GET /welcome');
});

module.exports = guestsRouter;