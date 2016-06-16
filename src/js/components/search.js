import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';
import Loading from 'reloading';

import { setupRequests, fetchPackageDetails } from '../actions';
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
    // if (this.state.errors) {
    //   return 'error';
    // }
  }

  handleJsonChange(e) {
    // const value = e.target.value;

    // if (!value) {
    //   this.setState({
    //     errors: false,
    //     loading: false
    //   });
    //   return;
    // }

    // try {
    //   var jsonValue = JSON.parse(value);
    //   this.setState({
    //     errors: false,
    //     json: jsonValue
    //   });
    // } catch (error) {
    //   this.gotDependenciesErrors();
    // }
  }

  generateDemoData() {
    const packages = prepareData(demoData);
    const numberOfPackages = packages.length;
    this.props.setupRequests(numberOfPackages, demoData);
    packages.forEach((value) => this.props.fetchPackageDetails(value));
  }

  onDrop(files) {
    // var self = this;
    // if (files.length === 1 && files[0].type === 'application/json') {
    //   var reader = new FileReader();

    //   reader.onload = function(e) {

    //     try {
    //       self.setState({
    //         errors: false,
    //         loading: true
    //       });

    //       // var jsonValue = JSON.parse(reader.result);
    //       // Actions.getDependencies(jsonValue);

    //     } catch (error) {
    //       self.gotDependenciesErrors();
    //     }

    //   };

    //   reader.readAsText(files[0]);
    // } else {
    //   this.setState({
    //     errors: true
    //   });
    // }
  }

  onTextAreaClick(event) {
    event.stopPropagation();
  }

  submitJson() {
    // if (this.state.json) {
    //   this.setState({
    //     loading: true,
    //   });
    //   // Actions.getDependencies(this.state.json);
    // } else {
    //   this.gotDependenciesErrors();
    // }
  }

  render() {
    // var errors;
    // if (this.state.errors) {
    //   errors = (
    //     <div className="container-fluid error-bar">
    //       <div className="alert alert-danger">
    //         Oops! Something is wrong with your package.json. Please try again.
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div>
        <div className="container-fluid">
          <div className="row search-bar">
            <div className="col-md-offset-3 col-md-6">

              <Dropzone onDrop={this.onDrop} className="dropzone" activeClassName="active">
                <div>
                  <textarea
                    type="textarea"
                    className="form-control input-lg"
                    rows="8"
                    bsStyle={this.validateInput()}
                    hasFeedback
                    placeholder="Place the content of your package.json and I will handle the work."
                    onChange={this.handleJsonChange}
                    onClick={this.onTextAreaClick} />

                  <div className="message">Drop your <strong>awesome</strong> package.json here</div>
                  <button className="btn btn-info">Upload package.json</button>
                </div>
              </Dropzone>

              {/*errors*/}
              <Loading shouldShow={this.props.results.get('isFetching')} className="loading">
                <i className="fa fa-refresh fa-spin"></i> Getting your (dev) dependencies
              </Loading>

              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-success btn-large btn-block"
                    onClick={this.submitJson}
                    disabled={this.props.results.get('isFetching')}>
                    Submit
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-danger btn-large btn-block"
                    onClick={() => this.generateDemoData()}
                    disabled={this.props.results.get('isFetching')}>
                    or do the demo?
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

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
    results: state.results
  };
};

export default connect(mapStateToProps, { setupRequests, fetchPackageDetails })(Search);
