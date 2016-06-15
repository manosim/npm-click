import React from 'react';
import { connect } from 'react-redux';
// import { Pie } from 'react-chartjs';

import constants from '../utils/constants';
import Package from '../components/package';

export default class ResultsPage extends React.Component {
  componentWillMount() {
    // var projectName = ProjectStore.getProjectDetails().name;
    // if (!projectName) {
    //   this.history.push('/');
    // }
  }

  getStats(packages) {
    const upToDate = packages.filter((pkg) => pkg.status.isUpToDate).size;
    const major = packages.filter((pkg) => pkg.status.isMajor).size;
    const minor = packages.filter((pkg) => pkg.status.isMinor).size;

    return {
      upToDate,
      major,
      minor
    };
  }

  render() {
    const dependencies = this.props.results.get('response').filter((obj) => obj.isDependency === true);
    const devDependencies = this.props.results.get('response').filter((obj) => obj.isDependency === false);

    const dependenciesStats = this.getStats(dependencies);
    const devDependenciesStats = this.getStats(devDependencies);

    return (
      <div className="results">
        <div className="container-fluid details">
          <div className="container">
            <h2>Project Details</h2>
            <div className="row">
              <div className="col-sm-4">
                <small>name</small> <h3>{this.props.project.get('name')}</h3>
                <small>version</small> <h4>{this.props.project.get('version')}</h4>
              </div>
              <div className="col-sm-2 stats-map">
                <small>dependencies</small>
                <div className="uptodate">
                  Up to date: {dependenciesStats.upToDate}
                </div>
                <div className="minor-updates">
                  Minor Updates: {dependenciesStats.minor}
                </div>
                <div className="major-updates">
                  Major Updates: {dependenciesStats.major}
                </div>
              </div>
              <div className="col-sm-2">
                {/*<Pie
                  data={this.state.packages.stats.dependencies}
                  options={constants.CHART_OPTIONS} redraw />*/}
              </div>
              <div className="col-sm-2 stats-map">
                <small>devDependencies</small>
                <div className="uptodate">
                  Up to date: {devDependenciesStats.upToDate}
                </div>
                <div className="minor-updates">
                  Minor Updates: {devDependenciesStats.minor}
                </div>
                <div className="major-updates">
                  Major Updates: {devDependenciesStats.major}
                </div>
              </div>
              <div className="col-sm-2">
                {/*<PieChart
                  data={this.state.packages.stats.devDependencies}
                  options={constants.CHART_OPTIONS} redraw />*/}
              </div>
            </div>
          </div>
        </div>

        <div className="container packages">
          <div className="row">
            <div className="col-md-6">
              <h3>Dependencies <span className="count">#{dependencies.size}</span></h3>
              {dependencies.map((pkg, i) => <Package key={i} details={pkg} />)}
            </div>

            <div className="col-md-6">
              <h3>DevDependencies <span className="count">#{devDependencies.size}</span></h3>
              {devDependencies.map((pkg, i) => <Package key={i} details={pkg} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// ResultsPage.contextTypes = {
//   router: React.PropTypes.func
// };

function mapStateToProps(state) {
  return {
    results: state.results,
    project: state.project
  };
};

export default connect(mapStateToProps, { })(ResultsPage);
