var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var apiRequests = require('../utils/api-requests');
var SearchStore = require('../stores/search-store');

var Repository = require('../components/repository');

var Results = React.createClass({
  mixins: [
    Reflux.connect(SearchStore, 'results'),
  ],

  getInitialState: function () {
    return {
      results: undefined,
      errors: false,
    };
  },

  render: function () {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h1>Results</h1>
            <Repository repositoryName='Example Repo' />
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Results;

// <Repository repositoryName={this.state.results[0].name} />