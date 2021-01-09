function Registry() {
  this._prompts = {};
}

Registry.prototype.use = function(name, handler) {
  this._prompts[name] = handler;
}

Registry.prototype.get = function(name) {
  var p = this._prompts[name];
  if (!p) { throw new Error("Cannot find prompt '" + name + "'"); }
  return p;
}


module.exports = Registry;
