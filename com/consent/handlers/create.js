exports = module.exports = function(grants, authenticator, store) {
  
  function create(req, res, next) {
    var client = {
      id: req.body.client_id
    };
    var grant = {};
    if (req.body.scope) {
      grant.scopes = [ {
        scope: req.body.scope.split(' ')
      } ];
    };
    
    grants.create(grant, client, req.user, function(err, user) {
      if (err) { return next(err); }
      return next();
    });
  }
  
  function resume(req, res, next) {
    return res.resumeState(next);
  }
  
  function redirect(req, res, next) {
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    authenticator.authenticate('session'),
    create,
    resume,
    redirect
  ];
};

exports['@require'] = [
  'module:@authnomicon/oauth2.GrantService',
  'module:passport.Authenticator',
  'module:flowstate.Store'
];
