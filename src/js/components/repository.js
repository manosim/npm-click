var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Repository = React.createClass({
  getInitialState: function () {
    return {
      name: this.props.repositoryName
    };
  },

  componentWillReceiveProps: function (newProps) {
    console.log("newProps");
    console.log(newProps);
    this.setState({
      name: newProps.repositoryName
    });
  },

  render: function () {
    return (
      <Row>
        <Col md={12}>{this.state.name}</Col>
      </Row>
    );
  }
});

module.exports = Repository;