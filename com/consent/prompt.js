var url = require('url');

exports = module.exports = function() {
  
  return function(req, res, next) {
    var q = {};
    if (res.locals.client) { q.client_id = res.locals.client.id; }
    if (res.locals.scope) { q.scope = res.locals.scope.join(' '); }
    
    return res.redirect(url.format({ pathname: '/consent', query: q }));
  };
};

exports['@implements'] = 'module:@authnomicon/prompts.RequestHandler'
exports['@name'] = 'consent';
