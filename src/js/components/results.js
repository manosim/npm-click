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
        version: undefined,
        description: undefined,
      },
      packages: {
        dependencies: [],
        devDependencies: [],
        stats: {
          dependencies: undefined,
          devDependencies: undefined
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
          <Col sm={4}>
            <small>name</small> {this.state.projectDetails.name}
            <small>version</small> {this.state.projectDetails.version}
            <small>description</small> {this.state.projectDetails.description}
          </Col>
          <Col sm={2}>
            <small>dependencies</small>
            <div className="uptodate">Up to date: 21</div>
            <div className="minor-updates">Minor Updates: 5</div>
            <div className="major-updates">Major Updates: 8</div>
          </Col>
          <Col sm={2}><PieChart data={this.state.packages.stats.dependencies} options={this.state.chartOptions} redraw /></Col>
          <Col sm={2}>
            <small>devDependencies</small>
            <div className="uptodate">Up to date: 21</div>
            <div className="minor-updates">Minor Updates: 5</div>
            <div className="major-updates">Major Updates: 8</div>
          </Col>
          <Col sm={2}><PieChart data={this.state.packages.stats.devDependencies} options={this.state.chartOptions} redraw /></Col>
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
