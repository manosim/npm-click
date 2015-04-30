var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Package = require('../components/package');
var DependenciesStore = require('../stores/dependencies-store');

var Results = React.createClass({
  mixins: [
    Reflux.connect(DependenciesStore, 'dependencies'),
  ],

  getInitialState: function () {
    return {
      dependencies: {
        dependencies: [],
        devDependencies: []
      },
      errors: false,
    };
  },

  render: function () {
    return (
      <Grid>
        <Row>

          <Col smOffset={1} sm={10}><h1>Your Dependencies</h1></Col>
          <Col smOffset={1} sm={10}>
            {this.state.dependencies.dependencies.map(function(object, i){
              return <Package dependency={object} />;
            })}
          </Col>

        </Row>

        <Row>
          <Col smOffset={1} sm={10}><h1>Your DevDependencies</h1></Col>
          <Col smOffset={1} sm={10}>
            {this.state.dependencies.devDependencies.map(function(object, i){
              return <Package dependency={object} />;
            })}
          </Col>

        </Row>
      </Grid>
    );
  }
});

module.exports = Results;
