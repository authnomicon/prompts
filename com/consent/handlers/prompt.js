var path = require('path')
  , ejs = require('ejs');

exports = module.exports = function(authenticator, store) {

  function prompt(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    
    //console.log('PROMPTING CONSENT');
    //console.log(req.state);
    
    res.render('consent', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/consent.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  };
  
  
  return [
    // TODO: authenticate this
    require('csurf')(),
    require('flowstate')({ store: store }),
    authenticator.authenticate('session'),
    prompt
  ];
};

exports['@require'] = [
  'module:passport.Authenticator',
  'module:flowstate.Store'
];
