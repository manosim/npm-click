var Reflux = require('reflux');

var Actions = Reflux.createActions({

  'getDependencies': {asyncResult: true},
  'onGetDependenciesErrors': {},
  'clearResults': {},
  'projectDetails': {}

});

module.exports = Actions;