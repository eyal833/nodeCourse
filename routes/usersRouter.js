const express = require('express');
const usersRouter = express.Router();
const passport = require('passport');
const { welcome, dashboard, logout, addSymbol,} = require('../controllers/users/users.controller');
const { middleware: db } = require('../middlewares/db');
const mongo = require('../middlewares/mongo');


const { addSymbolValidator } = require('../controllers/users/users.validators');
const enforeAuth = require('../middlewares/enforce-auth');
const enforceGuest = require('../middlewares/enforce-guest');
const joi = require('../middlewares/joi');


usersRouter.use(db);
usersRouter.use(mongo);
usersRouter.get('/welcome', enforceGuest, welcome);
usersRouter.get('/dashboard', enforeAuth, dashboard);
usersRouter.get('/logout', enforeAuth, logout);

usersRouter.post('/symbol', enforeAuth, addSymbol);



module.exports = usersRouter;