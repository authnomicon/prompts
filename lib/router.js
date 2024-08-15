var flatten = require('array-flatten')
  , slice = Array.prototype.slice;

function Router() {
  this._prompts = {};
}

Router.prototype.use = function(name, handler) {
  this._prompts[name] = flatten(slice.call(arguments, 1));;
}

Router.prototype.dispatch = function(name, req, res, next) {
  var stack = this._prompts[name];
  // TODO: likely want to next with req, res here
  if (!stack) { return next(new Error("Cannot find prompt '" + name + "'")); }
  
  dispatch(stack)(null, req, res, next);
}

function dispatch(stack) {
  return function(err, req, res, next) {
    var i = 0;

    function callbacks(err) {
      var fn = stack[i++];
      try {
        if ('route' == err) {
          next('route');
        } else if (err && fn) {
          if (fn.length < 4) return callbacks(err);
          fn(err, req, res, callbacks);
        } else if (fn) {
          if (fn.length < 4) return fn(req, res, callbacks);
          callbacks();
        } else {
          next(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }
    callbacks(err);
  }
};


module.exports = Router;
