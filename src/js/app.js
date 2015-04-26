var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var Search = require('./components/search');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation />
        <Search />
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <h1>Home Page!</h1>
    );
  }
});


React.render(<App />, document.getElementById('app'));
