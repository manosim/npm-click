var Actions = require('../actions/actions');
var Reflux = require('reflux');

var Store = Reflux.createStore({
  listenables: Actions,

  onProjectDetails: function (details) {
    this.trigger({
      name: details.name,
      version: details.version
    });
  },

});

module.exports = Store;
