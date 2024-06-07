/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../com/consent/handlers/prompt');


describe('consent/handlers/prompt', function() {
  
  it('should create handler', function() {
    var csurfSpy = sinon.spy();
    var flowstateSpy = sinon.spy();
    var factory = $require('../../../com/consent/handlers/prompt', {
      'csurf': csurfSpy,
      'flowstate': flowstateSpy
    });
    
    var authenticator = new Object();
    authenticator.authenticate = sinon.spy();
    var store = new Object();
    var handler = factory(undefined, authenticator, store);
    
    expect(handler).to.be.an('array');
    expect(csurfSpy).to.be.calledOnce;
    expect(csurfSpy).to.be.calledBefore(flowstateSpy);
    expect(flowstateSpy).to.be.calledOnce;
    expect(flowstateSpy).to.be.calledWith({ store: store });
    expect(flowstateSpy).to.be.calledBefore(authenticator.authenticate);
    expect(authenticator.authenticate).to.be.calledOnce;
    expect(authenticator.authenticate).to.be.calledWith('session');
  });
  
  describe('handler', function() {
    
    it('should render', function(done) {
      var mockClientDirectory = new Object();
      mockClientDirectory.read = sinon.stub().yieldsAsync(null, { id: 's6BhdRkqt3', name: 'My Example Client' })
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockClientDirectory, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.query = {};
          req.query.client_id = 's6BhdRkqt3';
          req.session = {};
          req.connection = {};
        })
        .finish(function() {
          expect(mockClientDirectory.read).to.have.been.calledWith('s6BhdRkqt3');
          
          expect(this).to.have.status(200);
          expect(this).to.render('consent');
          expect(this).to.include.locals([ 'user', 'application', 'csrfToken' ]);
          expect(this.locals.user).to.deep.equal({
            id: '248289761001',
            displayName: 'Jane Doe'
          });
          expect(this.locals.application).to.deep.equal({
            id: 's6BhdRkqt3',
            name: 'My Example Client'
          });
          done();
        })
        .listen();
    }); // should render
    
    it('should error when missing client_id parameter', function(done) {
      var mockClientDirectory = new Object();
      mockClientDirectory.read = sinon.stub().yieldsAsync(null, undefined);
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockClientDirectory, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.query = {};
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
    
    it('should error when client does not exist', function(done) {
      var mockClientDirectory = new Object();
      mockClientDirectory.read = sinon.stub().yieldsAsync(null, undefined);
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockClientDirectory, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.query = {};
          req.query.client_id = 's6BhdRkqt3';
          req.session = {};
          req.connection = {};
        })
        .next(function(err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equal('Client does not exist');
          expect(err.status).to.equal(422);
          done();
        })
        .listen();
    }); // should error when client does not exist
    
    it('should error when failing to read client', function(done) {
      var mockClientDirectory = new Object();
      mockClientDirectory.read = sinon.stub().yieldsAsync(new Error('something went wrong'))
      var mockAuthenticator = new Object();
      mockAuthenticator.authenticate = function(name, options) {
        return function(req, res, next) {
          req.user = { id: '248289761001', displayName: 'Jane Doe' };
          next();
        };
      };
      var mockStateStore = new Object();
      
      var handler = factory(mockClientDirectory, mockAuthenticator, mockStateStore);
    
      chai.express.use(handler)
        .request(function(req, res) {
          req.query = {};
          req.query.client_id = 's6BhdRkqt3';
          req.session = {};
          req.connection = {};
        })
        .next(function(err) {
          expect(err).to.be.an.instanceOf(Error);
          expect(err.message).to.equal('something went wrong');
          done();
        })
        .listen();
    }); // should error when failing to read client
    
  }); // handler
  
});
