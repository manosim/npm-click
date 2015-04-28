var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'getDependency': {asyncResult: true},
  'onGetDependenciesErrors': {}

});

module.exports = Actions;