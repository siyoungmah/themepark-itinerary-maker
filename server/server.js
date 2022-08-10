const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../src")));

app.listen(PORT, () => {
  console.log("We are listening on port 3000! Hoorah!")
});