var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Package = React.createClass({
  componentWillReceiveProps: function (newProps) {
    this.setState({
      dependency: newProps.dependency
    });
  },

  upToDate: function () {
    var isUpToDate = this.props.dependency.status;
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
    var readme;
    if (this.props.dependency.current.homepage) {
      readme = (
          <a href={this.props.dependency.current.homepage} target='_blank'><i className='fa fa-file-text-o'/></a>
      );
    }

    return (
      <Row className='package'>
        <Col xs={12} sm={1} className='status'><i className={this.upToDate()}></i></Col>
        <Col xs={12} sm={5} className='name'><small>name</small> {this.props.dependency.name} {readme}</Col>
        <Col xs={6} sm={3} className='required'><small>required</small><span>{this.props.dependency.version}</span></Col>
        <Col xs={6} sm={3} className=''><small>latest</small> {this.props.dependency.current['dist-tags'].latest}</Col>
      </Row>
    );
  }
});

module.exports = Package;
