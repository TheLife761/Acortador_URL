"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');

require('dotenv').config();

const expect = chai.expect;
chai.use(chaiHttp);

const SERVER = process.env.HOST + ":" + process.env.PORT;

describe('GET /', () => {
  it("Should return a valid response when requesting index", function (done) {
    const server = process.env.HOST + ":" + process.env.PORT;
    chai.request(SERVER)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('GET /:urlID', () => {
  
  it("Should return a status code of 404 for a non-existent URL ID", function (done) {
    chai.request(SERVER)
      .get('/404')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});