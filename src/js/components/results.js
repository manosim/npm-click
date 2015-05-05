var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var PieChart = require('react-chartjs').Pie;

var Package = require('../components/package');
var DependenciesStore = require('../stores/dependencies');
var ProjectStore = require('../stores/project-details');

var Results = React.createClass({

  mixins: [
    Reflux.connect(ProjectStore, 'projectDetails'),
    Reflux.connect(DependenciesStore, 'packages'),
  ],

  getInitialState: function () {
    return {
      projectDetails: {
        name: '-',
        version: '-'
      },
      packages: {
        dependencies: [],
        devDependencies: [],
        stats: {
          dependencies: [],
          devDependencies: []
        }
      },
      errors: false,
      chartOptions: {
        percentageInnerCutout : 35,
        segmentShowStroke : false,
        responsive: true
      }
    };
  },

  getStat: function (type, label) {
    if (this.state.packages.stats[type]) {
      for (var i = this.state.packages.stats[type].length - 1; i >= 0; i--) {
        if (this.state.packages.stats[type][i].label == label) {
          return this.state.packages.stats[type][i].value;
        }
      }
    }
    return '-';
  },

  render: function () {
    return (
      <div className='results'>
        <div className='container-fluid details'>
          <div className='container'>
            <h2>Project Details</h2>
            <Row>
              <Col sm={4}>
                <small>name</small> <h3>{this.state.projectDetails.name}</h3>
                <small>version</small> <h4>{this.state.projectDetails.version}</h4>
              </Col>
              <Col sm={2} className='stats-map'>
                <small>dependencies</small>
                <div className="uptodate">Up to date: {this.getStat('dependencies', 'Up to date')}</div>
                <div className="minor-updates">Minor Updates: {this.getStat('dependencies', 'Minor Update')}</div>
                <div className="major-updates">Major Updates: {this.getStat('dependencies', 'Major Update')}</div>
              </Col>
              <Col sm={2}><PieChart data={this.state.packages.stats.dependencies} options={this.state.chartOptions} redraw /></Col>
              <Col sm={2} className='stats-map'>
                <small>devDependencies</small>
                <div className="uptodate">Up to date: {this.getStat('devDependencies', 'Up to date')}</div>
                <div className="minor-updates">Minor Updates: {this.getStat('devDependencies', 'Minor Update')}</div>
                <div className="major-updates">Major Updates: {this.getStat('devDependencies', 'Major Update')}</div>
              </Col>
              <Col sm={2}><PieChart data={this.state.packages.stats.devDependencies} options={this.state.chartOptions} redraw /></Col>
            </Row>
          </div>
        </div>


        <Grid>
          <h2>Dependencies <span className='count'>({this.state.packages.dependencies.length})</span></h2>
          {this.state.packages.dependencies.map(function(object, i){
            return <Package key={object.name} dependency={object} />;
          })}

          <h2>DevDependencies <span className='count'>({this.state.packages.devDependencies.length})</span></h2>
          {this.state.packages.devDependencies.map(function(object, i){
            return <Package key={object.name} dependency={object} />;
          })}
        </Grid>
      </div>
    );
  }
});

module.exports = Results;
