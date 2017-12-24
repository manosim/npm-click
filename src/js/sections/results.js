import * as React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

import constants from '../utils/constants';
import SinglePackage from '../../ts/components/package';

export class ResultsPage extends React.Component {
  getStats(packages) {
    const upToDate = packages.filter(pkg => pkg.status.isUpToDate).size;
    const major = packages.filter(pkg => pkg.status.isMajor).size;
    const minor = packages.filter(pkg => pkg.status.isMinor).size;

    return {
      upToDate,
      major,
      minor,
    };
  }

  getChartData(stats) {
    return {
      labels: ['Up to date', 'Minor Update', 'Major Update'],
      datasets: [
        {
          backgroundColor: ['#0A0', '#FDB45C', '#F7464A'],
          data: [stats.upToDate, stats.minor, stats.major],
          options: { borderWidth: 0 },
        },
      ],
      options: {
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      },
    };
  }

  render() {
    const dependencies = this.props.results
      .get('response')
      .filter(obj => obj.isDependency === true);
    const devDependencies = this.props.results
      .get('response')
      .filter(obj => obj.isDependency === false);

    const dependenciesStats = this.getStats(dependencies);
    const devDependenciesStats = this.getStats(devDependencies);

    const dependenciesChart = this.getChartData(dependenciesStats);
    const devDependenciesChart = this.getChartData(devDependenciesStats);

    return (
      <div className="results">
        <div className="container-fluid details">
          <div className="container">
            <h2>Project Details</h2>
            <div className="row">
              <div className="col-sm-4">
                <small>name</small> <h3>{this.props.project.get('name')}</h3>
                <small>version</small>{' '}
                <h4>{this.props.project.get('version')}</h4>
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
                <Doughnut
                  data={dependenciesChart}
                  options={constants.CHART_OPTIONS}
                  redraw
                />
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
                <Doughnut
                  data={devDependenciesChart}
                  options={constants.CHART_OPTIONS}
                  redraw
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container packages">
          <div className="row">
            <div className="col-md-6">
              <h3>
                Dependencies <span className="count">#{dependencies.size}</span>
              </h3>
              {dependencies.map((pkg, i) => (
                <SinglePackage key={i} details={pkg} />
              ))}
            </div>

            <div className="col-md-6">
              <h3>
                DevDependencies{' '}
                <span className="count">#{devDependencies.size}</span>
              </h3>
              {devDependencies.map((pkg, i) => (
                <SinglePackage key={i} details={pkg} />
              ))}
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
    project: state.project,
  };
}

export default connect(mapStateToProps, null)(ResultsPage);
