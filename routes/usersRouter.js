const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/dashboard', (req, res) => {
    res.send('GET /dashboard');
});

usersRouter.get('/logout', (req, res) => {
    res.send('GET /logout');
});

usersRouter.post('/symbol', (req, res) => {
    res.send('POST /symbol');
});



module.exports = usersRouter;