var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Table = ReactBootstrap.Table;

var apiRequests = require('../utils/api-requests');
var SearchStore = require('../stores/search-store');

var Repository = require('../components/repository');

var Results = React.createClass({
  mixins: [
    Reflux.connect(SearchStore, 'results'),
  ],

  getInitialState: function () {
    return {
      results: [],
      errors: false,
    };
  },

  render: function () {
    return (
      <Grid>
        <h1>Results</h1>
        <Row>
          <Col md={2}>Compare</Col>
          <Col md={3}>Login</Col>
          <Col md={3}>Repository</Col>
          <Col md={2}>Stars</Col>
          <Col md={2}>Forks</Col>
        </Row>
        {this.state.results.map(function(object, i){
          return <Repository repository={object} />;
        })}
      </Grid>
    );
  }
});

module.exports = Results;

// <Repository repositoryName={this.state.results[0].name} />