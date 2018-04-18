const pgp = require('pg-promise')({
  capSQL: true
});
const db = require('./index.js').db;

// do a for loop 10000 times and then do an operation that instatiates an entry, then
// inserts that entry into database

async function getLastMovie() {
  try {
    let movieArray = await db.any('SELECT * from movies ORDER BY ID desc limit 1');
    const cs = new pgp.helpers.ColumnSet(['movie_id', 'title', 'category'], {table: 'movies'});
    let movie;
    if (!movieArray[0]) {
      movie = {movie_id: 0};
    } else {
      movie = movieArray[0];
    }
    let values = [];

    for (let i = movie.movie_id + 1; i <= movie.movie_id + 5000001; i++) {

      let object = {
        movie_id: i,
        title: 'Drive',
        category: 'action'
      }
      values.push(object);
    }

    const query = pgp.helpers.insert(values, cs);

    db.none(query)
      .then(data => {
      })
      .catch(error => {
      });
  }
  catch (error) {
    console.log(error);
  }
}

getLastMovie()
