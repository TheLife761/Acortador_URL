"use strict";



// let sql = `SELECT * FROM links
//            ORDER BY originalUrl`;

// db.all(sql, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

// // close the database connection
// db.close();

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);


describe('GET /', () => {
  it("Should return a valid response when requesting index", function (done) {
    chai.request("http://localhost:3000")
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET /:urlID', () => {
  it("Should return a status code of 404 for a non existent URL ID", function (done) {
    chai.request("http://localhost:3000")
      .get('/404')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Should return a valid response for an existing URL ID", function (done) {
    chai.request("http://localhost:3000")
      .get('_PLACEHOLDER_')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});