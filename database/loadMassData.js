const pgp = require('pg-promise')({
  capSQL: true
});
// const db = require('./index.js')
// const cn = {
//     host: 'localhost',
//     port: 3000,
//     database: 'movies'
// };
// const db = pgp(cn);

const db = require('./index.js').db;


// do a for loop 10000 times and then do an operation that instatiates an entry, then
// inserts that entry into database


const cs = new pgp.helpers.ColumnSet(['title', 'category'], {table: 'movies'});

const values = [{title: 'Gucci Mane', category: 'action'}, {title: 'Be Your Bible', category: 'adventure'}]

for (var i = 0; i <= 5000000; i++) {
  values.push({title: 'Gucci Mane', category: 'action'});
}

const query = pgp.helpers.insert(values, cs);

db.none(query)
  .then(data => {
    console.log('SHOW DATA');
  })
  .catch(error => {

    console.log(error);
    console.log('ERROR!');
  });
