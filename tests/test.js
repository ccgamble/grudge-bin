var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp);

describe('GET /', function() {
  it('should return homepage', function(done) {
    chai.request(server)
    .get('/')
    .end(function(error,response) {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });
});

