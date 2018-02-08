const db = require('./index.js').db;
const pgp = require('./index.js').pgp;

const findOne = (id, cb) => {

    db.any('SELECT * from movies WHERE id = $1', [id])
      .then( (movie) => {
        console.log('THE MOVIE', movie);
        cb(null, movie);
      })
      .catch( (error) => {
        console.log('ERROR');
        cb(error);
      })

}

const findMany = (stringifiedArray, cb) => {
  // console.log('STRINGIFIED INPUT', stringifiedArray, Array.isArray(stringifiedArray), typeof stringifiedArray);

  let arrayOfIds = JSON.parse(stringifiedArray);
  // console.log('ARRAY FOR PARSE', arrayOfIds, Array.isArray(arrayOfIds), typeof arrayOfIds);

  // let arrayOfIds = string.replace(' ', '').split(',').map( (item) => {
  //   return parseInt(item);
  // })

  let arrayOfQueries = arrayOfIds.map( (item) => {
    return `SELECT * FROM movies WHERE movie_id = ${item}`;
  });

  let queryForMulti = arrayOfQueries.join(';');

  db.multi(queryForMulti)
    .then( data => {
      cb(null, data);
    })
    .catch( error => {
      cb(error, null)
    })

}

const addOne = (movieObject, cb) => {

  const columns = ['movie_id', 'title', 'category', 'description', 'length', 'year', 'director', 'critical_acclaim', 'language', 'thumbnail_url'];

  let objectForInsert = {};
  for (let i = 0; i < columns.length; i++) {
    if (movieObject[columns[i]]) {
      objectForInsert[columns[i]] = movieObject[columns[i]];
    } else {
      objectForInsert[columns[i]] = null;
    }
  }

  console.log('FINAL MOVIE FOR INSERT', objectForInsert);

  let arrayOfValues = [];

  for (var i = 0; i < columns.length; i++) {
    let value = objectForInsert[columns[i]];
    arrayOfValues.push(value);
  }
  console.log('ARRAY OF VALUES', arrayOfValues);

  db.one('INSERT INTO movies(movie_id, title, category, description, length, year, director, critical_acclaim, language, thumbnail_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', arrayOfValues)
    .then( (movie) => {
      console.log('DA MOVIE', movie);
      cb(null, 'hii')
    })
    .catch( (error) => {
      console.log('ERROR', error);
      cb(error, null)
    });

}


const updateOne = (reqQuery, cb) => {
  let arrayOfKeys = Object.keys(reqQuery);


}

module.exports = {
  findOne,
  findMany,
  addOne,
  updateOne
}
