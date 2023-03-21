var express = require('express');

exports = module.exports = function(promptHandler, createHandler) {
  var router = express.Router();
  router.get('/', promptHandler);
  router.post('/', createHandler);
  
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@path'] = '/consent';
exports['@require'] = [
  './handlers/prompt',
  './handlers/create'
];
