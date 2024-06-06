/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../../com/consent/service');


describe('consent/service', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('http://i.bixbyjs.org/http/Service');
    expect(factory['@path']).to.equal('/consent');
  });
  
  it('should create service', function() {
    function promptHandler() {};
    function createHandler() {};
  
    var service = factory(promptHandler, createHandler);
    
    expect(service).to.be.a('function');
    expect(service.length).to.equal(3);
  });
  
});
