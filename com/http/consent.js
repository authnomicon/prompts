exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/consent');
  };
};

exports['@implements'] = 'http://i.authnomicon.org/prompts/http/Prompt';
exports['@name'] = 'consent';
