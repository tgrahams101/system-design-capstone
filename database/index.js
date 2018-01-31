const promise = require('bluebird');
const options = {
  promiseLib: promise
};
const pgp = require('pg-promise');
const connectionString = 'postgres://localhost:3000/movies';
const db = pgp(connectionString);


module.exports = db;
