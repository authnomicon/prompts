var path = require('path')
  , ejs = require('ejs')
  , errors = require('http-errors');

exports = module.exports = function(clients, authenticator, store) {

  function loadClient(req, res, next) {
    clients.read(req.query.client_id, function(err, client) {
      if (err) { return next(err); }
      if (!client) {
        return next(new errors.UnprocessableEntity('Client does not exist'));
      }
      
      // NOTE: If a `client` is set on `locals`, rendering an ejs view that uses
      // inclues (ie, most ejs views) will fail with an error: "include is not a function".
      // Due to this, the client is set at `application`.
      //
      // For more information, refer to:
      //   https://github.com/mde/ejs/issues/525
      //   https://stackoverflow.com/questions/44323864/ejs-include-is-not-a-function-error
      res.locals.application = client;
      next();
    });
  }

  function prompt(req, res, next) {
    if (req.query.scope) {
      res.locals.scope = req.query.scope.split(' ');
    }
    res.locals.user = req.user;
    res.locals.csrfToken = req.csrfToken();
    
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
    require('csurf')(),
    require('flowstate')({ store: store }),
    authenticator.authenticate('session'),
    loadClient,
    prompt
  ];
};

exports['@require'] = [
  'http://i.authnomicon.org/oauth2/ClientDirectory',
  'module:passport.Authenticator',
  'module:flowstate.Store'
];
