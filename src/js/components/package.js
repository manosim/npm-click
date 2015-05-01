var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Package = React.createClass({
  getInitialState: function () {
    return {
      dependency: this.props.dependency
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      dependency: newProps.dependency
    });
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
        console.log('A major new update is available!');
        return -1;
    } else if (running_version.minor < latest_version.minor || running_version.patch < latest_version.patch) {
        // A new minor or patch update is available.
        console.log('A new minor or patch update is available.');
        return 0;
    } else {
        // We are running the latest version! No need to update.
        console.log('We are running the latest version! No need to update.');
        return 1;
    }
  },

  upToDate: function () {
    var installedVersion = this.state.dependency.version;
    var latestVersion = this.state.dependency.current['dist-tags'].latest;
    var isUpToDate = this.compareVersionNumbers(installedVersion, latestVersion);
    if (isUpToDate === 1) {
      return 'has-latest fa fa-check-circle';
    } else if (isUpToDate === 0) {
      return 'has-minor fa fa-exclamation-circle';
    } else if (isUpToDate === -1) {
      return 'has-major fa fa-times-circle-o';
    } else {
      return 'has-errored fa fa-question-circle';
    }
  },

  render: function () {
    return (
      <Row className='package'>
        <Col xs={12} sm={1} className='status'><i className={this.upToDate()}></i></Col>
        <Col xs={12} sm={4} className='name'><small>name</small> {this.state.dependency.name}</Col>
        <Col xs={6} sm={3} className=''><small>required</small> {this.state.dependency.version}</Col>
        <Col xs={6} sm={3} className=''><small>latest</small> {this.state.dependency.current['dist-tags'].latest}</Col>
        <Col xs={6} sm={1} className=''><small>more</small> coming</Col>
      </Row>
    );
  }
});

module.exports = Package;