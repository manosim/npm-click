var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Package = require('../components/package');
var DependenciesStore = require('../stores/dependencies-store');
var ProjectStore = require('../stores/project-details');

var Results = React.createClass({
  mixins: [
    Reflux.connect(ProjectStore, 'projectDetails'),
    Reflux.connect(DependenciesStore, 'packages')
  ],

  getInitialState: function () {
    return {
      projectDetails: {
        name: undefined,
        description: undefined,
      },
      packages: {
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
          <Col md={4}><small>name</small> {this.state.projectDetails.name}</Col>
          <Col md={8}><small>description</small> {this.state.projectDetails.description}</Col>
        </Row>

        <h2>Dependencies - {this.state.packages.dependencies.length}</h2>
        {this.state.packages.dependencies.map(function(object, i){
          return <Package key={object.name} dependency={object} />;
        })}

        <h2>DevDependencies - {this.state.packages.devDependencies.length}</h2>
        {this.state.packages.devDependencies.map(function(object, i){
          return <Package key={object.name} dependency={object} />;
        })}
      </Grid>
    );
  }
});

module.exports = Results;
