exports = module.exports = function(IoC, logger) {
  var Registry = require('../../lib/registry');
  
  
  var registry = new Registry();
  
  return Promise.resolve(registry)
    .then(function(registry) {
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.authnomicon.org/prompts/http/Prompt');
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(registry);
          }
        
          component.create()
            .then(function(prompt) {
              logger.info('Loaded HTTP prompt: ' + component.a['@name']);
              registry.use(component.a['@name'], prompt);
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
    .then(function(registry) {
      return registry;
    });
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Registry';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
