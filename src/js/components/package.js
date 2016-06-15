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
    const details = this.props.details;
    let readme;

    if (details.homepage) {
      readme = (
        <a href={details.homepage} target="_blank"><i className="fa fa-file-text-o" /></a>
      );
    }

    const latestVersion = details.hasOwnProperty('dist-tags') && details['dist-tags'].hasOwnProperty('latest') ?
      this.props.details['dist-tags'].latest : '-';

    return (
      <div className="row package">
        <div classname="col-sm-1 col-md-12 status">
          <i className={this.upToDate()}></i>
        </div>
        <div classname="col-sm-5 col-md-12 name">
          <small>name</small> {details.name} {readme}
        </div>
        <div classname="col-sm-3 col-md-6 required">
          <small>required</small><span> {details.requiredVersion}</span>
        </div>
        <div classname="col-sm-3 col-md-6">
          <small>latest</small> {latestVersion}
        </div>
      </div>
    );
  }
};
