var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Repository = React.createClass({
  getInitialState: function () {
    return {
      name: this.props.name
    };
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      name: props.repositoryName
    });
  },

  render: function () {
    return (
      <Row>
        <Col>Hello, I'm a repository! {this.state.name}</Col>
      </Row>
    );
  }
});

module.exports = Repository;