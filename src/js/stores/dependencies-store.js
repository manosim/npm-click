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

    console.log(type + ', - ' + name + ': ' + version);
    Actions.getDependency.completed(type, name, version);


    // apiRequests
    //   .post('http://registry.npmjs.org/' + , data)
    //   .end(function (err, response) {
    //     if (response.ok) {
    //       // Success - Do Something.
    //       Actions.getDependency.completed(response.body.id);
    //     } else {
    //       // Error - Show messages.
    //       Actions.getDependency.failed(response.body);
    //     }
    //   });
  },

  onGetDependencyCompleted: function (type, name, version) {
    console.log('Get Dependency - Success.');
    if (type === 'dependencies') {
      this._dependencies.push({
        'name': name,
        'version': version
      });
    } else if (type === 'devDependencies') {
      this._devDependencies.push({
        'name': name,
        'version': version
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
  }

});

module.exports = DependenciesStore;