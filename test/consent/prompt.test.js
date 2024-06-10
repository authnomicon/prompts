/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../com/consent/prompt');


describe('consent/prompt', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('module:@authnomicon/prompts.RequestHandler');
    expect(factory['@name']).to.equal('consent');
  });
  
  it('should create handler', function() {
    var handler = factory();
    expect(handler).to.be.a('function');
  });
  
  describe('handler', function() {
  
    it('should redirect', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/consent');
          done();
        })
        .listen();
    }); // should redirect
    
    it('should redirect with client ID', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.locals = {
            client: {
              id: 's6BhdRkqt3'
            }
          };
        })
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/consent?client_id=s6BhdRkqt3');
          done();
        })
        .listen();
    }); // should redirect with client ID
    
    it('should redirect with client ID and scope', function(done) {
      var handler = factory();
    
      chai.express.use(handler)
        .request(function(req, res) {
          res.locals = {
            client: {
              id: 's6BhdRkqt3'
            },
            scope: [ 'openid', 'email', 'address', 'phone' ]
          };
        })
        .finish(function() {
          expect(this.statusCode).to.equal(302);
          expect(this.getHeader('Location')).to.equal('/consent?client_id=s6BhdRkqt3&scope=openid%20email%20address%20phone');
          done();
        })
        .listen();
    }); // should redirect with client ID and scope
    
  }); // handler
  
});
