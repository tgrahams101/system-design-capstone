const db = require('./index.js').db;
const pgp = require('pg-promise')({
  capSQL: true
});
const cs = new pgp.helpers.ColumnSet(['title', 'category', 'movie_id'], {table: 'movies'});


db.tx('massive-insert', t => {
    return t.sequence(index => {
        return getNextData(t, index)
            .then(data => {
                if (data) {
                    const insert = pgp.helpers.insert(data, cs);
                    return t.none(insert);
                }
            });
    });
})
    .then(data => {

    })
    .catch(error => {

    });

    function getNextData(t, pageIndex) {
        let data = null;
        if (pageIndex < 1000) {
            data = [];
            for (let i = 0; i < 10000; i++) {
                const idx = pageIndex * 10000 + i; // to insert unique product names
                data.push({
                    title: 'product-' + idx,
                    category: 'thriller',
                    movie_id: idx
                });
            }
        }
      return Promise.resolve(data);
    }
