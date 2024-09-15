'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const SERVER = process.env.HOST + ":" + process.env.PORT;

describe('POST /api/shortener', function () {
    const path = "/api/shortener";

    it('Should be able to send parameters to /api/shortener via POST', function (done) {
        chai.request(SERVER)
            .post(path)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ url: 'https://www.google.com' })
            .end(function (err, res, body) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});