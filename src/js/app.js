var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var Search = require('./components/search');

var App = React.createClass({
  getInitialState: function () {
    return {
      results: false
    };
  },

  onGetResults: function (results) {
    this.setState({
        results: results
    });
  },

  render: function () {
    return (
      <div>
        <Navigation />
        <Search updateResults={this.onGetResults} />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
