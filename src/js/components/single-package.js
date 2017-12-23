import * as React from "react";

export default class SinglePackage extends React.Component {
  getStatus() {
    if (this.props.details.errored) {
      return 'has-errored fa fa-question-circle';
    }
    const { isMajor, isMinor, isUpToDate } = this.props.details.status;
    if (isUpToDate) {
      return 'has-latest fa fa-check-circle';
    } else if (isMinor) {
      return 'has-minor fa fa-exclamation-circle';
    } else if (isMajor) {
      return 'has-major fa fa-times-circle-o';
    } else {
      return 'has-errored fa fa-question-circle';
    }
  }

  render() {
    let readme;

    const { name, payload, requiredVersion } = this.props.details;
    const latestVersion = payload.hasOwnProperty('dist-tags')
      ? payload['dist-tags'].latest
      : '-';

    if (payload.homepage) {
      readme = (
        <a href={payload.homepage} target="_blank">
          <i className="fa fa-file-text-o" />
        </a>
      );
    }

    return (
      <div className="row package">
        <div className="col-sm-1 col-md-12 status">
          <i className={this.getStatus()} />
        </div>
        <div className="col-sm-5 col-md-12 name">
          <small>name</small> {name} {readme}
        </div>
        <div className="col-sm-3 col-md-6 required">
          <small>required</small>
          <span> {requiredVersion}</span>
        </div>
        <div className="col-sm-3 col-md-6">
          <small>latest</small> {latestVersion}
        </div>
      </div>
    );
  }
}
