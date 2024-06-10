/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../com/consent/handlers/create');


describe('consent/handlers/create', function() {
  
  it('should create handler', function() {
    var bodyParserSpy = sinon.spy();
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../../com/consent/handlers/create', {
      'body-parser': { urlencoded: bodyParserSpy },
      'csurf': csurfSpy,
      'flowstate': flowstateSpy
    });
    
    var authenticator = new Object();
    authenticator.authenticate = sinon.spy();
    var store = new Object();
    var handler = factory(undefined, authenticator, store);
    
    expect(handler).to.be.an('array');
    expect(bodyParserSpy).to.be.calledOnce;
    expect(bodyParserSpy).to.be.calledWith({ extended: false });
    expect(bodyParserSpy).to.be.calledBefore(csurfSpy);
    expect(csurfSpy).to.be.calledOnce;
    expect(csurfSpy).to.be.calledBefore(flowstateSpy);
    expect(flowstateSpy).to.be.calledOnce;
    expect(flowstateSpy).to.be.calledWith({ store: store });
    expect(flowstateSpy).to.be.calledBefore(authenticator.authenticate);
    expect(authenticator.authenticate).to.be.calledOnce;
    expect(authenticator.authenticate).to.be.calledWith('session');
  });
  
  describe('handler', function() {
    
    it('should create grant without scope', function(done) {
      var mockGrantService = new Object();
      mockGrantService.create = sinon.stub().yieldsAsync(null, { id: 'TSdqirmAxDa0_-DB_1bASQ' })
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockGrantService, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.body = {};
          req.body.client_id = 's6BhdRkqt3';
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(mockGrantService.create).to.have.been.calledWith({
          }, {
            id: 's6BhdRkqt3'
          }, {
            id: '248289761001',
            displayName: 'Jane Doe'
          });
          
          expect(this).to.have.status(302);
          expect(this.getHeader('Location')).to.equal('/');
          done();
        })
        .listen();
    }); // should create grant without scope
    
    it('should create grant with single scope', function(done) {
      var mockGrantService = new Object();
      mockGrantService.create = sinon.stub().yieldsAsync(null, { id: 'TSdqirmAxDa0_-DB_1bASQ' })
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockGrantService, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.body = {};
          req.body.client_id = 's6BhdRkqt3';
          req.body.scope = 'write';
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(mockGrantService.create).to.have.been.calledWith({
            scopes: [ {
              scope: [ 'write' ]
            } ]
          }, {
            id: 's6BhdRkqt3'
          }, {
            id: '248289761001',
            displayName: 'Jane Doe'
          });
          
          expect(this).to.have.status(302);
          expect(this.getHeader('Location')).to.equal('/');
          done();
        })
        .listen();
    }); // should create grant with single scope
    
    it('should create grant with multiple scopes', function(done) {
      var mockGrantService = new Object();
      mockGrantService.create = sinon.stub().yieldsAsync(null, { id: 'TSdqirmAxDa0_-DB_1bASQ' })
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockGrantService, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.body = {};
          req.body.client_id = 's6BhdRkqt3';
          req.body.scope = 'contacts read';
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(mockGrantService.create).to.have.been.calledWith({
            scopes: [ {
              scope: [ 'contacts', 'read' ]
            } ]
          }, {
            id: 's6BhdRkqt3'
          }, {
            id: '248289761001',
            displayName: 'Jane Doe'
          });
          
          expect(this).to.have.status(302);
          expect(this.getHeader('Location')).to.equal('/');
          done();
        })
        .listen();
    }); // should create grant with multiple scopes
    
    it('should error when missing client_id parameter', function(done) {
      var mockGrantService = new Object();
      mockGrantService.create = sinon.stub().yieldsAsync(null)
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockGrantService, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.body = {};
          req.session = {};
          req.connection = {};
        })
        .next(function(err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equal('Missing required parameter: client_id');
          expect(err.status).to.equal(400);
          done();
        })
        .listen();
    }); // should error when missing client_id parameter
    
  }); // handler
  
});
