var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Dependency = React.createClass({
  getInitialState: function () {
    return {
      dependency: this.props.dependency
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      dependency: newProps.dependency
    });
  },

  render: function () {
    return (
      <Row>
        <Col sm={3}>{this.state.dependency.name}</Col>
        <Col sm={2}>{this.state.dependency.version}</Col>
        <Col sm={5}>{this.state.dependency.current.description}</Col>
        <Col sm={2}>{this.state.dependency.current['dist-tags'].latest}</Col>
      </Row>
    );
  }
});

module.exports = Dependency;