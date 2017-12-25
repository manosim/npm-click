import * as React from 'react';
import { connect } from 'react-redux';
import * as Dropzone from 'react-dropzone';

import { setFileError } from '../actions';
import { fetchPackagesDetails } from '../actions';
import { prepareData, prepareProjectDetails } from '../utils/prepareData';
import demoData from '../../js/utils/demoData';

interface IProps {
  error: string;
  results: any;
  isLoading: boolean;

  fetchPackagesDetails(details: [any], projectDetails: {}): void;
  setFileError(error: string): void;
}

class Search extends React.Component<IProps, {}> {
  generateDemoData() {
    const packages: any = prepareData(demoData);
    const projectDetails: {} = prepareProjectDetails(demoData);
    const numberOfPackages = packages.length;
    this.props.fetchPackagesDetails(packages, projectDetails);
  }

  handleJsonChange(e: any) {
    try {
      const jsonValue = JSON.parse(e.target.value);
      const packages = prepareData(jsonValue);
      const projectDetails: {} = prepareProjectDetails(demoData);
      this.props.fetchPackagesDetails(packages, projectDetails);
    } catch (error) {
      this.props.setFileError(`${error}`);
    }
  }

  handleFileChange(e: any) {
    this.handleFile(e.target.files[0]);
  }

  handleDropChange(files: any) {
    if (files.length === 1 && files[0].type === 'application/json') {
      this.handleFile(files[0]);
    } else {
      this.props.setFileError(
        'It looks like you are trying to upload multiple files or ' +
          'you did not upload a .json file. Please try again.'
      );
    }
  }

  handleFile(file: any) {
    const self = this;
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const jsonValue = JSON.parse(reader.result);
        const packages = prepareData(jsonValue);
        const projectDetails: {} = prepareProjectDetails(demoData);
        self.props.fetchPackagesDetails(packages, projectDetails);
      } catch (error) {
        self.props.setFileError(`${error}`);
      }
    };

    reader.readAsText(file);
  }

  onTextAreaClick(event: { stopPropagation(): void }) {
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
                  rows={16}
                  className="form-control input-lg"
                  placeholder="Place the contents of your package.json and I will handle the work."
                  onChange={e => this.handleJsonChange(e)}
                  onClick={this.onTextAreaClick}
                  disabled={this.props.isLoading}
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

interface IState {
  results: any;
  project: any;
}

export function mapStateToProps(state: IState) {
  return {
    isLoading: state.results.get('isFetching'),
    results: state.results,
    error: state.project.get('error'),
  };
}

export default connect(mapStateToProps, {
  fetchPackagesDetails,
  setFileError,
})(Search as any);
