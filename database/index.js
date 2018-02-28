const promise = require('bluebird');
// const options = {
//   promiseLib: promise
// };
// const pgp = require('pg-promise')(options);
// const connectionString = 'postgres://localhost:3000/movies';

var options = {
    promiseLib: promise,
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message);
        }
    }
};

var pgp = require("pg-promise")(options);
const cn = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'movies',
};

const Ec2cn = {
  host: 'ec2-34-215-237-38.us-west-2.compute.amazonaws.com',
  port: 5432,
  database: 'movies',
  user: 'power_user',
  password: 'power_user'
}

const db = pgp(Ec2cn);
// var db = pgp('invalid connection string');

db.connect()
    .then(function (obj) {
      console.log('IT WORKS!');
        obj.done(); // success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });

module.exports = {
  pgp,
  db};
