import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';
import Loading from 'reloading';

import { setupRequests, fetchPackageDetails, readFileError } from '../actions';
import prepareData from '../utils/prepareData';
import demoData from '../utils/demoData';

class Search extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.results.get('isFetching') !== this.props.results.get('isFetching')
      && this.props.results.get('isFetching')) {
      this.context.router.push('/results');
    }
  }

  validateInput() {
    // if (c) {
    //   return 'error';
    // }
  }

  handleJsonChange(e) {
    try {
      const jsonValue = JSON.parse(e.target.value);
      const packages = prepareData(jsonValue);
      const numberOfPackages = packages.length;
      this.props.setupRequests(numberOfPackages, demoData);
      packages.forEach((value) => this.props.fetchPackageDetails(value));
    } catch (error) {
      this.props.readFileError(`${error}`);
    }
  }

  generateDemoData() {
    const packages = prepareData(demoData);
    const numberOfPackages = packages.length;
    this.props.setupRequests(numberOfPackages, demoData);
    packages.forEach((value) => this.props.fetchPackageDetails(value));
  }

  onDrop(files) {
    const self = this;
    if (files.length === 1 && files[0].type === 'application/json') {
      const reader = new FileReader();

      reader.onload = function(e) {
        try {
          const jsonValue = JSON.parse(reader.result);
          const packages = prepareData(jsonValue);
          const numberOfPackages = packages.length;
          self.props.setupRequests(numberOfPackages, demoData);
          packages.forEach((value) => self.props.fetchPackageDetails(value));
        } catch (error) {
          self.props.readFileError(`${error}`);
        }
      };

      reader.readAsText(files[0]);
    } else {
      this.props.readFileError('It looks like you are trying to upload multiple files or ' +
        'you did not upload a .json file. Please try again.');
    }
  }

  onTextAreaClick(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        {this.props.error ? <div className="alert alert-danger search-alert">{this.props.error}</div> : null}
        <div className="container-fluid">

          <div className="row search-bar">
            <div className="col-md-10">
              <div className={this.props.error ? 'form-group has-danger' : 'form-group'}>
                <textarea
                  type="textarea"
                  rows="16"
                  className="form-control input-lg"
                  placeholder="Place the contents of your package.json and I will handle the work."
                  onChange={(e) => this.handleJsonChange(e)}
                  onClick={this.onTextAreaClick} />
              </div>
            </div>

            <div className="col-md-2 search-sidebar">
              <button
                className="btn btn-danger btn-large btn-block"
                onClick={() => this.generateDemoData()}
                disabled={this.props.results.get('isFetching')}>
                <i className="fa fa-play" aria-hidden="true" />
                Demo
              </button>

              <button
                className="btn btn-block btn-info">
                <i className="fa fa-cloud-upload" aria-hidden="true" />
                Upload
              </button>

              <Dropzone onDrop={(files) => this.onDrop(files)} className="dropzone" activeClassName="active">
                Drop your <strong>awesome</strong> package.json here
              </Dropzone>
            </div>

          </div>
        </div>

        <Loading shouldShow={this.props.results.get('isFetching')} className="loading">
          <i className="fa fa-refresh fa-spin"></i> Getting your (dev) dependencies
        </Loading>

        <h3>Loading: {this.props.results.get('isFetching') ? 'true' : 'false'}</h3>
        <h3>Total: {this.props.results.get('total')}</h3>
        <h3>Completed: {this.props.results.get('completed')}</h3>
      </div>
    );
  }
};

Search.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    results: state.results,
    error: state.project.get('error')
  };
};

export default connect(mapStateToProps, { setupRequests, fetchPackageDetails, readFileError })(Search);
