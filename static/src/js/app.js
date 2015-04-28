var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var Search = require('./components/search');

var Actions = require('./actions/actions');
var Results = require('./components/results');
var SearchStore = require('./stores/search-store');

var App = React.createClass({
  mixins: [
    Reflux.connect(SearchStore, 'results'),
    Reflux.listenTo(Actions.searchErrors, 'onSearchErrors')
  ],

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
        <Search />
        <Results />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
