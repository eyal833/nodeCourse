const express = require('express');
const config = require('config');
const path = require('path');
const session = require('express-session');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
const guestsRouter = require('./routes/guestsRouter');
const usersRouter = require('./routes/usersRouter');
const githubRouter = require('./routes/githubRouter');
const auth = require('./middlewares/auth');
const app = express();
const port = config.get('app.port');
const host = config.get('app.host');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(session({
  secret: 'very-very-strong-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(auth.initialize());
app.use(auth.session());

app.use(express.json());
app.use('/', guestsRouter);
app.use('/', usersRouter);
app.use('/github', githubRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(port, host, () => {
  console.log(`app listening on port ${port}`)
})





