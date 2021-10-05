function Registry() {
  this._prompts = {};
}

Registry.prototype.use = function(name, handler) {
  this._prompts[name] = handler;
}

Registry.prototype.get = function(name) {
  return this._prompts[name];
}


module.exports = Registry;
