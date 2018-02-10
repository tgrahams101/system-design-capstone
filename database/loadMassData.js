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




async function getLastMovie() {
  try {
    let movieArray = await db.any('SELECT * from movies ORDER BY ID desc limit 1');
    console.log('MOVIE ARRAY', movieArray, Array.isArray(movieArray), typeof movieArray, movieArray[0], 'THEEEEE ID', movieArray[0].movie_id);
    const cs = new pgp.helpers.ColumnSet(['movie_id', 'title', 'category'], {table: 'movies'});
    let movie = movieArray[0];
    let values = [];
    console.log('MOVIE BEFORE LOOP', movie);
    console.log('THE MOVIE ID', movie.movie_id)
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
        console.log('SHOW DATA');
      })
      .catch(error => {

        console.log(error);
        console.log('ERROR!');
      });


  }
  catch (error) {
    console.log(error);
  }
}

getLastMovie()
// let lastMovie = (async () => {
//   return await getLastMovie();
// })()
// let lastMovie = await (async () => {await getLastMovie()})()
// console.log(lastMovie);

// let lastId = null;
// db.any('SELECT * from movies ORDER BY ID desc limit 1')
//   .then( (movie) => {
//     console.log('THE MOVIE', movie);
//     console.log('THE MOVIE ID', movie.movie_id)
//     lastId = movie.movie_id;
//
//
//   })
//   .catch( (error) => {
//     console.log(error);
//
//   })



//
// for (var i = 0; i <= 5000000; i++) {
//
//   let object = {
//     movie_id: i + 1203,
//     title: 'Drive',
//     category: 'action'
//   }
//
//   values.push(object);
// }
//
// const query = pgp.helpers.insert(values, cs);
//
// db.none(query)
//   .then(data => {
//     console.log('SHOW DATA');
//   })
//   .catch(error => {
//
//     console.log(error);
//     console.log('ERROR!');
//   });
