exports = module.exports = function(grants, authenticator, store) {
  
  // TODO: Make this handle a realm parameter, to mirror HTTP Basic auth
  function create(req, res, next) {
    console.log('CREATE GRANT!');
    console.log(req.user);
    console.log(req.body);
    
    var grant = {
      scope: [ 'foo' ]
    };
    
    grants.create(grant, req.user, function(err, user) {
      if (err) { return next(err); }
      return next();
    });
  }
  
  function resumeOr(req, res, next) {
    console.log('ATTEMPTING TO RESUME');
    console.log(req.state);
    
    return res.resumeState(next);
  }
  
  function redirect(req, res, next) {
    console.log('REDIRECTING....');
    
    res.redirect('/');
  }
  
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    require('csurf')({ value: function(req){ return req.body && req.body.csrf_token; } }),
    require('flowstate')({ store: store }),
    authenticator.authenticate('session'),
    create,
    resumeOr,
    redirect
  ];
};

exports['@require'] = [
  'module:@authnomicon/oauth2.GrantService',
  'module:@authnomicon/session.Authenticator',
  'module:flowstate.Store'
];
