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
    Reflux.connect(DependenciesStore, 'project'),
  ],

  getInitialState: function () {
    return {
      project: {
        name: undefined,
        description: undefined,
        dependencies: [],
        devDependencies: []
      },
      errors: false,
    };
  },

  render: function () {
    return (
      <Grid className='results'>
        <h2>Project Details</h2>
        <Row>
          <Col md={4}><small>name</small> {this.state.project.name}</Col>
          <Col md={8}><small>description</small> {this.state.project.description}</Col>
        </Row>

        <h2>Dependencies - {this.state.project.dependencies.length}</h2>
        {this.state.project.dependencies.map(function(object, i){
          return <Package key={object.name} dependency={object} />;
        })}

        <h2>DevDependencies - {this.state.project.devDependencies.length}</h2>
        {this.state.project.devDependencies.map(function(object, i){
          return <Package key={object.name} dependency={object} />;
        })}
      </Grid>
    );
  }
});

module.exports = Results;
