var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var Search = require('./components/search');
var Results = require('./components/results');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation />
        <Search />
        <Results />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
