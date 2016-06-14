import React from 'react';

export default class Package extends React.Component {

  componentWillReceiveProps(newProps) {
    this.setState({
      dependency: newProps.dependency
    });
  }

  upToDate() {
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
  }

  render() {
    var readme;
    if (this.props.dependency.current.homepage) {
      readme = (
        <a href={this.props.dependency.current.homepage} target='_blank'>
          <i className='fa fa-file-text-o'/>
        </a>
      );
    }

    return (
      <div className='row package'>
        <div classname="col-sm-1 col-md-12 status">
          <i className={this.upToDate()}></i>
        </div>
        <div classname="col-sm-5 col-md-12 name">
          <small>name</small> {this.props.dependency.name} {readme}
        </div>
        <div classname="col-sm-3 col-md-6 required">
          <small>required</small><span>{this.props.dependency.version}</span>
        </div>
        <div classname="col-sm-3 col-md-6 ">
          <small>latest</small> {this.props.dependency.current['dist-tags'].latest}
        </div>
      </div>
    );
  }
};
