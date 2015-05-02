var Actions = require('../actions/actions');
var Reflux = require('reflux');

var Store = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._name = undefined;
    this._version = undefined;
    this._description = undefined;
  },

  onProjectDetails: function (details) {
    this._name = details.name;
    this._version = details.version;
    this._description = details.description;

    console.log({
      name: this._name,
      version: this._version,
      details: this._description
    });

    this.trigger({
      name: this._name,
      version: this._version,
      description: this._description
    });
  },

});

module.exports = Store;
