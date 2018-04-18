const chai = require('chai');
const expect = require('chai').expect;
const should = chai.should();
const axios = require('axios');
const chaiHttp = require('chai-http');
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('Server', function() {

  it('Server works', function (done) {
    axios('http://localhost:3000')
    .then( (data) => {
      expect(data.data).to.equal('Hello World!');
      expect(data.status).to.equal(200);
      done();
    });
  });

  it('Get a Single movie Id works', function (done) {
    chai.request('http://localhost:3000')
      .get('/getmovie')
      .query({id: 1399})
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('movie_id');
        expect(res.body[0]).to.have.property('title');
        done();
      })
      .catch(function (err) {
        throw err;
      })
  });
})
