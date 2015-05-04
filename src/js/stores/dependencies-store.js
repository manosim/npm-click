var Actions = require('../actions/actions');
var Reflux = require('reflux');
var u = require('underscore');
var apiRequests = require('../utils/api-requests');

var DependenciesStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._dependencies = [];
    this._devDependencies = [];
    this._stats = {
      dependencies: [
        {
          value: 0,
          color: "#0A0",
          highlight: "#008f00",
          label: "Up to date"
        },
        {
          value: 0,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Minor Update"
        },
        {
          value: 0,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Major Update"
        }
      ],
      devDependencies: [
        {
          value: 0,
          color: "#0A0",
          highlight: "#008f00",
          label: "Up to date"
        },
        {
          value: 0,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Minor Update"
        },
        {
          value: 0,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Major Update"
        }
      ],
    };
    this._length = {
      dependencies: 0,
      devDependencies: 0
    };
  },

  setStats: function (type, status) {
    if (status === -1) {
      // A major new update is available!
      for (var i = this._stats[type].length - 1; i >= 0; i--) {
        if (this._stats[type][i].label == 'Major Update') {
          this._stats[type][i].value ++;
        }
      }
    } else if (status === 0) {
      // A new minor or patch update is available.
      for (var k = this._stats[type].length - 1; k >= 0; k--) {
        if (this._stats[type][k].label == 'Minor Update') {
          this._stats[type][k].value ++;
        }
      }
    } else {
      // We are running the latest version! No need to update.
      for (var l = this._stats[type].length - 1; l >= 0; l--) {
        if (this._stats[type][l].label == 'Up to date') {
          this._stats[type][l].value ++;
        }
      }
    }
  },

  compareVersionNumbers: function (v1, v2) {
    // http://maymay.net/blog/2008/06/15/ridiculously-simple-javascript-version-string-to-object-parser/
    function parseVersionString (str) {
      if (typeof(str) != 'string') { return false; }
      var x = str.split('.');
      // parse from string or default to 0 if can't parse
      var maj = parseInt(x[0]) || 0;
      var min = parseInt(x[1]) || 0;
      var pat = parseInt(x[2]) || 0;
      return {
        major: maj,
        minor: min,
        patch: pat
      };
    }

    var running_version = parseVersionString(v1.replace(/[^0-9.]/g, ''));
    var latest_version = parseVersionString(v2);
    if (running_version.major < latest_version.major) {
        // A major new update is available!
        return -1;
    } else if (running_version.minor < latest_version.minor || running_version.patch < latest_version.patch) {
        // A new minor or patch update is available.
        return 0;
    } else {
        // We are running the latest version! No need to update.
        return 1;
    }
  },

  makeRequest: function (type, name, version) {
    var self = this;

    apiRequests
      .get('https://registry.npmjs.org/' + name)
      .end(function (err, response) {
        if (response.ok) {
          // Success - Do Something.
          var latestVersion = response.body['dist-tags'].latest;
          var status = self.compareVersionNumbers(version, latestVersion);
          self.setStats(type, status);

          if (type === 'dependencies') {
            self._dependencies.push({
              'name': name,
              'version': version,
              'status': status,
              'current': response.body
            });
          } else if (type === 'devDependencies') {
            self._devDependencies.push({
              'name': name,
              'version': version,
              'status': status,
              'current': response.body
            });
          }

          if (self._dependencies.length == self._length.dependencies && self._devDependencies.length == self._length.devDependencies) {
            Actions.getDependencies.completed();
          }

        } else {
          // Error - Show messages.
          Actions.getDependencies.failed(response.body);
        }
      });
  },

  onGetDependencies: function (jsonValue) {
      Actions.clearResults();
      Actions.projectDetails({
        name: jsonValue.name || '-',
        version: jsonValue.version || '-'
      });

      var self = this;

      self._length.dependencies = u.size(jsonValue.dependencies);
      self._length.devDependencies = u.size(jsonValue.devDependencies);

      u.mapObject(jsonValue.dependencies, function(val, key) {
        self.makeRequest('dependencies', key, val);
      });

      u.mapObject(jsonValue.devDependencies, function(val, key) {
        self.makeRequest('devDependencies', key, val);
      });
  },

  onGetDependenciesFailed: function (errors) {
    Actions.onGetDependenciesErrors(errors);
  },

  onClearResults: function () {
    this._dependencies = [];
    this._devDependencies = [];

    u.mapObject(this._stats.dependencies, function(val, key) {
      val.value = 0;
    });

    u.mapObject(this._stats.devDependencies, function(val, key) {
      val.value = 0;
    });
  },

  getResults: function () {

    this._dependencies = u.sortBy(this._dependencies, 'name');
    this._devDependencies = u.sortBy(this._devDependencies, 'name');

    return {
      'dependencies': this._dependencies,
      'devDependencies': this._devDependencies,
      'stats': this._stats
    };
  },

});

module.exports = DependenciesStore;
