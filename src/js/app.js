var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var DependenciesField = require('./components/dependencies-field');

var Results = require('./components/results');

var App = React.createClass({
  getInitialState: function () {
    return {
      results: undefined
    };
  },

  onSearchErrors: function (errors) {
    console.log("Errors:");
    console.log(errors);
  },

  render: function () {
    return (
      <div>
        <Navigation />
        <DependenciesField />
        <Results />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
