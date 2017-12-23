import * as React from 'react';
import { connect } from 'react-redux';
import * as Dropzone from 'react-dropzone';

import { setupRequests, fetchPackageDetails, readFileError } from '../actions';
import prepareData from '../utils/prepareData';
import demoData from '../utils/demoData';

class Search extends React.Component {
  generateDemoData() {
    const packages = prepareData(demoData);
    const numberOfPackages = packages.length;
    this.props.setupRequests(numberOfPackages, demoData);
    packages.forEach(value => this.props.fetchPackageDetails(value));
  }

  handleJsonChange(e) {
    try {
      const jsonValue = JSON.parse(e.target.value);
      const packages = prepareData(jsonValue);
      const numberOfPackages = packages.length;
      this.props.setupRequests(numberOfPackages, demoData);
      packages.forEach(value => this.props.fetchPackageDetails(value));
    } catch (error) {
      this.props.readFileError(`${error}`);
    }
  }

  handleFileChange(e) {
    this.handleFile(e.target.files[0]);
  }

  handleDropChange(files) {
    if (files.length === 1 && files[0].type === 'application/json') {
      this.handleFile(files[0]);
    } else {
      this.props.readFileError(
        'It looks like you are trying to upload multiple files or ' +
          'you did not upload a .json file. Please try again.'
      );
    }
  }

  handleFile(file) {
    const self = this;
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const jsonValue = JSON.parse(reader.result);
        const packages = prepareData(jsonValue);
        const numberOfPackages = packages.length;
        self.props.setupRequests(numberOfPackages, demoData);
        packages.forEach(value => self.props.fetchPackageDetails(value));
      } catch (error) {
        self.props.readFileError(`${error}`);
      }
    };

    reader.readAsText(file);
  }

  onTextAreaClick(event) {
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        {this.props.error ? (
          <div className="alert alert-danger search-alert">
            {this.props.error}
          </div>
        ) : null}
        <div className="container-fluid">
          <div className="row search-bar">
            <div className="col-md-10">
              <div
                className={
                  this.props.error ? 'form-group has-danger' : 'form-group'
                }
              >
                <textarea
                  type="textarea"
                  rows="16"
                  className="form-control input-lg"
                  placeholder="Place the contents of your package.json and I will handle the work."
                  onChange={e => this.handleJsonChange(e)}
                  onClick={this.onTextAreaClick}
                />
              </div>
            </div>

            <div className="col-md-2 search-sidebar">
              <button
                className="btn btn-success btn-large btn-block"
                onClick={() => this.generateDemoData()}
                disabled={this.props.results.get('isFetching')}
              >
                <i className="fa fa-play" aria-hidden="true" />
                Demo
              </button>

              <label className="btn btn-block btn-info">
                <i className="fa fa-cloud-upload" aria-hidden="true" />
                Upload{' '}
                <input
                  type="file"
                  onChange={e => this.handleFileChange(e)}
                  style={{ display: 'none' }}
                />
              </label>

              <Dropzone
                onDrop={files => this.handleDropChange(files)}
                className="dropzone"
                activeClassName="active"
              >
                <p>
                  Drop your <strong>awesome</strong> package.json here
                </p>
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
    error: state.project.get('error'),
  };
}

export default connect(mapStateToProps, {
  setupRequests,
  fetchPackageDetails,
  readFileError,
})(Search);
