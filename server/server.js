const express = require('express');
const app = express();
const path = require('path');

const apiRouter = require('./routes/api.js');

const PORT = process.env.PORT || 3000;

// handle parsing request body
app.use(express.json());

// handle requests for static files for css styling, index.html and bundle.js
app.use(express.static(path.join(__dirname, "../src")));
app.use(express.static(path.resolve(__dirname, "../dist")))


app.use('/api', apiRouter);

// global error handler
app.use((err, req, res, next) => {
  console.log('ERROR:', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  // return errorObj.status.send(errorObj.message); // changed status.send to changed status.json per
  return res.status(errorObj.status).json(errorObj.message);
});

// start the server
app.listen(PORT, () => {
  console.log("We are listening on port 3000! Hoorah!")
});
