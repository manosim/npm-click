'use strict';

var Actions = require('../actions/actions');
var Reflux = require('reflux');
var apiRequests = require('../utils/api-requests');

var DependenciesStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    // this._id = undefined;
  },

  onGetDependency: function (dependency) {

    console.log("Dependency:");
    console.log(dependency);
    Actions.getDependency.completed('GOT IT!');

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

  onGetDependencyCompleted: function (value) {
    console.log('Get Dependencies - Success.');
    this._id = value;
    this.trigger(this._id);
  },

  onGetDependencyFailed: function (errors) {
    console.log('Get Dependencies - Error.');
    Actions.onGetDependenciesErrors(errors);
  }

});

module.exports = DependenciesStore;