var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Repository = React.createClass({
  getInitialState: function () {
    return {
      repository: this.props.repository
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      repository: newProps.repository
    });
  },

  render: function () {
    return (
      <Row>
        <Col md={1}><Input type='checkbox' label='' /></Col>
        <Col md={3}>{this.state.repository.owner.login}</Col>
        <Col md={3}>{this.state.repository.name}</Col>
        <Col md={2}>{this.state.repository.stargazers_count}</Col>
        <Col md={2}>{this.state.repository.forks_count}</Col>
      </Row>
    );
  }
});

module.exports = Repository;