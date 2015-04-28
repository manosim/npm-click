var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'getDependency': {asyncResult: true},
  'onGetDependenciesErrors': {},
  'clearResults': {}

});

module.exports = Actions;