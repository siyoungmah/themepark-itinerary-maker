const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const apiRouter = require('./routes/api.js');
const dbRouter = require('./routes/db.js');
const { USERNAME, PASSWORD } = require('./login.js');

const PORT = process.env.PORT || 3000;
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.oxwvn7x.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'solo_project'
})
  .then(() => console.log('Connected to MongoDB.'))
  .catch((err) => console.log(err)
);

// handle parsing request body
app.use(express.json());

// handle requests for static files for css styling, index.html and bundle.js
app.use(express.static(path.join(__dirname, "../src")));
app.use(express.static(path.resolve(__dirname, "../dist")))


app.use('/api', apiRouter);
app.use('/db', dbRouter);

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
