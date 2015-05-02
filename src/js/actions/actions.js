var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'getDependency': {asyncResult: true},
  'onGetDependenciesErrors': {},
  'clearResults': {},
  'projectDetails': {}

});

module.exports = Actions;