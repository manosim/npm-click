var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Repository = require('../components/repository');

var Results = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      errors: false,
    };
  },

  render: function () {
    return (
      <Grid>
        <h1>Your Dependencies</h1>
        {this.state.results.map(function(object, i){
          return <Repository repository={object} />;
        })}
      </Grid>
    );
  }
});

module.exports = Results;
