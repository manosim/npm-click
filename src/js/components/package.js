import React from 'react';

export default class Package extends React.Component {

  upToDate() {
    var isUpToDate = this.props.details.status;
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
    let readme;

    const { name, payload, requiredVersion } = this.props.details;
    const latestVersion = payload.hasOwnProperty('dist-tags') ? payload['dist-tags'].latest : '-';

    if (payload.homepage) {
      readme = (
        <a href={payload.homepage} target="_blank"><i className="fa fa-file-text-o" /></a>
      );
    }

    return (
      <div className="row package">
        <div classname="col-sm-1 col-md-12 status">
          <i className={this.upToDate()}></i>
        </div>
        <div classname="col-sm-5 col-md-12 name">
          <small>name</small> {name} {readme}
        </div>
        <div classname="col-sm-3 col-md-6 required">
          <small>required</small><span> {requiredVersion}</span>
        </div>
        <div classname="col-sm-3 col-md-6">
          <small>latest</small> {latestVersion}
        </div>
      </div>
    );
  }
};
