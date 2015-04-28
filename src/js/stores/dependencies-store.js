'use strict';

var Actions = require('../actions/actions');
var Reflux = require('reflux');
var apiRequests = require('../utils/api-requests');

var DependenciesStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._dependencies = [];
    this._devDependencies = [];
  },

  onGetDependency: function (type, name, version) {

    var filteredVersion = version.replace(/[^0-9.]/g, '');

    apiRequests
      .get('https://registry.npmjs.org/' + name)
      .end(function (err, response) {
        if (response.ok) {
          // Success - Do Something.
          Actions.getDependency.completed(type, name, filteredVersion, response.body);
        } else {
          // Error - Show messages.
          Actions.getDependency.failed(response.body);
        }
      });
  },

  onGetDependencyCompleted: function (type, name, version, response) {

    console.log('Get Dependency - Success.');

    if (type === 'dependencies') {
      this._dependencies.push({
        'name': name,
        'version': version,
        'current': response
      });
    } else if (type === 'devDependencies') {
      this._devDependencies.push({
        'name': name,
        'version': version,
        'current': response
      });
    }

    this.trigger({
      'dependencies': this._dependencies,
      'devDependencies': this._devDependencies
    });

  },

  onGetDependencyFailed: function (errors) {
    console.log('Get Dependencies - Error.');
    Actions.onGetDependenciesErrors(errors);
  },

  onClearResults: function () {
    this._dependencies = [];
    this._devDependencies = [];
  },

});

module.exports = DependenciesStore;