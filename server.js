const cluster = require('cluster');

if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
    });

    cluster.on('exit', function(worker, code, signal) {
        cluster.fork();
    });

} else {

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
    });
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  app.get('/getmovie', (req, res) => {
    const queryId = req.query.id;
    queries.findOne(queryId, (err, value) => {
      if (err){
        res.sendStatus(500));
      } else {
        res.send(value);
      }
    })
  })

  app.post('/getmany', checkRedis, (req, res) => {
    queries.findMany(req.body.list, (error, array) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.json(array);
      }
    })
  })

  app.post('/addmovie', (req, res) => {
    queries.addOne(req.body, (error, movie) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.send(movie);
      }
    })
  })
}
