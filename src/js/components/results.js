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
      <Grid className='results'>
        <h2>Dependencies - {this.state.dependencies.dependencies.length}</h2>
        {this.state.dependencies.dependencies.map(function(object, i){
          return <Package dependency={object} />;
        })}

        <h2>DevDependencies - {this.state.dependencies.devDependencies.length}</h2>
        {this.state.dependencies.devDependencies.map(function(object, i){
          return <Package dependency={object} />;
        })}
      </Grid>
    );
  }
});

module.exports = Results;
