const express = require('express');
const guestsRouter = express.Router();

guestsRouter.get('/welcome', (req, res) => {
  res.render('welcome')
});

module.exports = guestsRouter;