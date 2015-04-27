var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Repository = React.createClass({
  getInitialState: function () {
    return {
      repository: this.props.repository
    };
  },

  componentWillReceiveProps: function (newProps) {
    console.log("newProps");
    console.log(newProps);
    this.setState({
      repository: newProps.repository
    });
  },

  render: function () {
    return (
      <Row>
        <Col md={12}>{this.state.repository.owner.login}/{this.state.repository.name}: {this.state.repository.stargazers_count}</Col>
      </Row>
    );
  }
});

module.exports = Repository;