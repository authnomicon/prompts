exports = module.exports = function(IoC, logger) {
  var Router = require('../lib/router');
  
  
  var router = new Router();
  
  return Promise.resolve(router)
    .then(function(router) {
      return new Promise(function(resolve, reject) {
        var components = IoC.components('module:@authnomicon/prompts.RequestHandler');
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(router);
          }
        
          component.create()
            .then(function(prompt) {
              logger.info('Loaded HTTP prompt: ' + component.a['@name']);
              router.use(component.a['@name'], prompt);
              iter(i + 1);
            }, function(err) {
              var msg = 'Failed to load HTTP prompt: ' + component.a['@name'] + '\n';
              msg += err.stack;
              logger.warning(msg);
              return iter(i + 1);
            })
        })(0);
      });
    })
    .then(function(router) {
      return router;
    });
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Router';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
