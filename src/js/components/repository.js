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
    this.setState({
      repository: newProps.repository
    });
  },

  render: function () {
    return (
      <tr>
        <td>{this.state.repository.owner.login}</td>
        <td>{this.state.repository.name}</td>
        <td>{this.state.repository.stargazers_count}</td>
      </tr>
    );
  }
});

module.exports = Repository;