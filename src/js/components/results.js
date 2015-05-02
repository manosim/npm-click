var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var PieChart = require('react-chartjs').Pie;

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
        devDependencies: [],
        stats: {
          dependencies: [],
          devDependencies: []
        },
      },
      errors: false,
      chartOptions: {
        percentageInnerCutout : 35,
        responsive: true
      }
    };
  },

  render: function () {
    return (
      <Grid className='results'>
        <h2>Project Details</h2>
        <Row className='details'>
          <Col sm={3}><small>name</small> {this.state.projectDetails.name}</Col>
          <Col sm={5}><small>description</small> {this.state.projectDetails.description}</Col>
          <Col sm={2}><PieChart data={this.state.packages.stats.dependencies} options={this.state.chartOptions} /></Col>
          <Col sm={2}><PieChart data={this.state.packages.stats.devDependencies} options={this.state.chartOptions} /></Col>
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
