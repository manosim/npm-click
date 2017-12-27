import * as React from 'react';

import constants from '../../js/utils/constants';

interface IProps {
  details: any;
}

const PATH_TO_REPO_URL = [
  'payload',
  'collected',
  'metadata',
  'link',
  'repository',
];

export default class SinglePackage extends React.Component<IProps, {}> {
  getStatus() {
    if (this.props.details.get('errored')) {
      return 'has-errored fa fa-question-circle';
    }
    const isSatisfied = this.props.details.get('isSatisfied');

    if (isSatisfied) {
      return 'has-latest fa fa-check-circle';
    } else {
      return 'has-major fa fa-times-circle-o';
    }
  }

  render() {
    const { details } = this.props;
    const latestVersion = details.getIn(
      ['payload', 'collected', 'metadata', 'version'],
      '-'
    );
    const readme = details.hasIn(PATH_TO_REPO_URL) && (
      <a href={details.getIn(PATH_TO_REPO_URL)} target="_blank">
        <i className="fa fa-file-text-o" />
      </a>
    );

    return (
      <div className="row package">
        <div className="col-sm-1 status">
          <i className={this.getStatus()} />
        </div>

        <div className="col-sm-5 name">
          <div>
            <small>name</small>
          </div>
          {details.get('name')} {readme && readme}
        </div>

        <div className="col-xs-6 col-sm-3 required">
          <div>
            <small>required</small>
          </div>
          <span>{details.get('requiredVersion')}</span>
        </div>

        <div className="col-xs-6 col-sm-3 latest">
          <div>
            <small>latest</small>
          </div>
          <span>{latestVersion}</span>
        </div>
      </div>
    );
  }
}
