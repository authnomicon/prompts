exports = module.exports = function() {
  
  return function(req, res, next) {
    console.log('PROMPT FOR LOGIN!');
    
    return res.redirect('/login');
    
    
    //req.locals = req.locals || {};
    //next();
  };
};

exports['@implements'] = 'http://i.authnomicon.org/http/prompt/Prompt';
exports['@name'] = 'login';
