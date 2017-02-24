var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var app = require('../server.js');
chai.use(chaiHttp);

describe('GET /', () => {
  it('should return homepage', (done) => {
    chai.request(app)
    .get('/')
    .end((error,response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    });
  });
  
  it('should post a new grudge', (done) => {
    const newGrudge = {id: 1, name: 'Trump', description: 'too many things', forgiven: false}
    chai.request(app)
    .post('/api/grudges')
    .send(newGrudge)
    .end((error, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('id');
      response.body.data.should.have.property('name');
      response.body.data.should.have.property('description');
      response.body.data.should.be.eql(newGrudge);
      done();
    })
  })

  it('should return the list of grudges', (done) => {
    const grudges = app.locals.grudges
    chai.request(app)
    .get('/api/grudges')
    .end((error,response) => {
      response.body.should.be.a('array');
      response.body.should.be.eql(grudges);
      done();
    });
  });
  
  it('should render the individual grudge', (done) => {
    const newGrudge = {id: 1, name: 'Trump', description: 'too many things', forgiven: false}

    chai.request(app)
    .get('/api/grudges/e73b50caa075714a2c8396b24da496b5')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body[0].data.should.be.eql(newGrudge);
      done();
    });
  });
});
