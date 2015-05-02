var Actions = require('../actions/actions');
var Reflux = require('reflux');
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
  },

  setStats: function (type, status) {
    console.log("...");
    if (status === -1) {
      // A major new update is available!
      for (var i = this._stats[type].length - 1; i >= 0; i--) {
        console.log(this._stats[type][i].label);
        if (this._stats[type][i].label == 'Major Update') {
          this._stats[type][i].value ++;
        }
      }
    } else if (status === 0) {
      // A new minor or patch update is available.
      for (var k = this._stats[type].length - 1; k >= 0; k--) {
        console.log(this._stats[type][k].label);
        if (this._stats[type][k].label == 'Minor Update') {
          this._stats[type][k].value ++;
        }
      }
    } else {
      // We are running the latest version! No need to update.
      for (var l = this._stats[type].length - 1; l >= 0; l--) {
        console.log(this._stats[type][l].label);
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
          Actions.getDependency.completed(type, name, version, status, response.body);
        } else {
          // Error - Show messages.
          Actions.getDependency.failed(response.body);
        }
      });
  },

  onGetDependency: function (jsonValue) {
      Actions.clearResults();
      Actions.projectDetails({
        name: jsonValue.name || '-',
        description: jsonValue.description || '-'
      });

      for (var key in jsonValue) {
        if (key === 'dependencies' || key === 'devDependencies') {
          var dependencies = jsonValue[key];

          for (var name in dependencies) {
            this.makeRequest(key, name, dependencies[name]);
          }
        }
      }
  },

  onGetDependencyCompleted: function (type, name, version, status, response) {

    if (type === 'dependencies') {
      this._dependencies.push({
        'name': name,
        'version': version,
        'status': status,
        'current': response
      });
    } else if (type === 'devDependencies') {
      this._devDependencies.push({
        'name': name,
        'version': version,
        'status': status,
        'current': response
      });
    }

    this.trigger({
      'dependencies': this._dependencies,
      'devDependencies': this._devDependencies,
      'stats': this._stats
    });

  },

  onGetDependencyFailed: function (errors) {
    Actions.onGetDependenciesErrors(errors);
  },

  onClearResults: function () {
    this._dependencies = [];
    this._devDependencies = [];
    // this._stats = [];
  },

});

module.exports = DependenciesStore;
