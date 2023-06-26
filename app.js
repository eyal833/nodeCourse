const express = require('express');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/error');
const guestsRouter = require('./routes/guestsRouter');
const usersRouter = require('./routes/usersRouter');
const githubRouter = require('./routes/githubRouter');
const app = express();
const port = 3000;
const host = 'localhost';

app.use(express.json());
app.use('/', guestsRouter);
app.use('/', usersRouter);
app.use('/github', githubRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(port, host, () => {
  console.log(`app listening on port ${port}`)
})





