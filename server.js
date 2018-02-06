const newRelic = require('newrelic');
const express = require('express');
const app = express();
const database = require('./database/index.js');
const bodyParser = require('body-parser');
const queries = require('./database/queries.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.listen(3000, () => {
  console.log('Example app listening on port 3000');
})

app.get('/', (req, res) => {
  res.send('Hello World');
})



app.get('/getmovie', (req, res) => {
  console.log('THE QUERY', req.query.id);
  const queryId = req.query.id;
  queries.findOne(queryId, (err, value) => {
    if (err){
      res.send('ERROR');
    } else {
      res.send(value);
    }
  })
})

app.get('/getmany', (req, res) => {

  queries.findMany(req.query.list, (error, array) => {
    if (error) {
      res.send('ERROR BRUH');
    } else {
      console.log('MULTI QUERY WORKED!');
      res.json(array);
    }
  })

})

app.post('/addmovie', (req, res) => {
  console.log('THE REQ BODY', req.body);

  queries.addOne(req.body, (error, movie) => {
    if (error) {
      console.log('ERROR BRUH', error);
      res.send()
    } else {
      console.log('THE MOVIE BRUH', movie);
      res.send(movie)
    }
  })

})
