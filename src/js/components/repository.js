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
    console.log(newProps);
    this.setState({
      dependency: newProps.dependency
    });
  },

  render: function () {
    return (
      <Row>
        <Col sm={3}>{this.state.dependency.name}</Col>
        <Col sm={3}>{this.state.dependency.version}</Col>
      </Row>
    );
  }
});

module.exports = Dependency;