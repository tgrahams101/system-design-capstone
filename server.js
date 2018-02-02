const newRelic = require('newrelic');
const express = require('express');
const app = express();
const database = require('./database/index.js');

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000');
})
