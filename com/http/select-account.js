exports = module.exports = function() {
  
  return function(req, res, next) {
    return res.redirect('/account/select');
  };
};

exports['@implements'] = 'http://i.authnomicon.org/http/prompt/Prompt';
exports['@name'] = 'select-account';
