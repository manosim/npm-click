var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Package = React.createClass({
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

  upToDate: function () {
    var isUpToDate = this.state.dependency.status;
    if (isUpToDate === 1) {
      return 'has-latest fa fa-check-circle';
    } else if (isUpToDate === 0) {
      return 'has-minor fa fa-exclamation-circle';
    } else if (isUpToDate === -1) {
      return 'has-major fa fa-times-circle-o';
    } else {
      return 'has-errored fa fa-question-circle';
    }
  },

  render: function () {
    return (
      <Row className='package'>
        <Col xs={12} sm={1} className='status'><i className={this.upToDate()}></i></Col>
        <Col xs={12} sm={5} className='name'><small>name</small> {this.state.dependency.name}</Col>
        <Col xs={6} sm={3} className=''><small>required</small> {this.state.dependency.version}</Col>
        <Col xs={6} sm={3} className=''><small>latest</small> {this.state.dependency.current['dist-tags'].latest}</Col>
      </Row>
    );
  }
});

module.exports = Package;