const newRelic = require('newrelic');
const express = require('express');
const app = express();
const database = require('./database/index.js');
const bodyParser = require('body-parser');
const queries = require('./database/queries.js');
const redis = require('redis');

const redisClient = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.listen(3000, () => {
  console.log('Example app listening on port 3000');
})

const checkRedis = (req, res, next) => {

  let stringifiedArray = req.body.list;

  redisClient.get(stringifiedArray, (err, data) => {
    if (err) {
      throw error;
    }
    if (data != null) {
        res.send(JSON.parse(data));
    } else {
      next();
    }
  })
}

app.get('/', (req, res) => {
  res.send('Hello World!');
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

app.post('/getmany', checkRedis, (req, res) => {

  queries.findMany(req.body.list, (error, array) => {
    if (error) {
      res.send(error);
    } else {
      res.json(array);
    }
  })
})

app.post('/addmovie', (req, res) => {
  console.log('THE REQ BODY', req.body);

  queries.addOne(req.body, (error, movie) => {
    if (error) {
      console.log('ERROR BRUH', error);
      res.send(error);
    } else {
      console.log('THE MOVIE BRUH', movie);
      res.send(movie);
    }
  })

})

app.patch('/updatemovie', (req, res) => {
  let reqQuery = req.query;
  queries.updateOne(reqQuery, (error, update) => {

  })


})

module.exports.redisClient = redisClient;
