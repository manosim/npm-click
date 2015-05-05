var Actions = require('../actions/actions');
var Reflux = require('reflux');

var Store = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._name = undefined;
    this._version = undefined;
  },

  onProjectDetails: function (details) {
    this._name = details.name;
    this._version = details.version;
  },

  getProjectDetails: function () {
    return {
      name: this._name,
      version: this._version
    };
  },

});

module.exports = Store;
