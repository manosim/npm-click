import * as React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

import constants from '../../js/utils/constants';
import SinglePackage from '../../ts/components/package';

interface IProps {
  results: any;
  project: any;
}

export class ResultsPage extends React.Component<IProps, {}> {
  getStats(packages: any) {
    const upToDate = packages.filter(
      (pkg: any) => pkg.get('isSatisfied') && !pkg.get('errored')
    ).size;
    const needUpdate = packages.filter(
      (pkg: any) => !pkg.get('isSatisfied') && !pkg.get('errored')
    ).size;

    return {
      upToDate,
      needUpdate,
    };
  }

  getChartData(stats: { upToDate: number; needUpdate: number }) {
    return {
      labels: ['Up to date', 'Need Update'],
      datasets: [
        {
          backgroundColor: ['#0A0', '#F7464A'],
          data: [stats.upToDate, stats.needUpdate],
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
      .filter((obj: any) => obj.get('isDependency') === true);
    const devDependencies = this.props.results
      .get('response')
      .filter((obj: any) => obj.get('isDependency') === false);

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
                <div className="need-update">
                  Need Update: {dependenciesStats.needUpdate}
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
                <div className="need-update">
                  Need Update: {devDependenciesStats.needUpdate}
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
            <div className="col-md-12">
              <h3>
                Dependencies <span className="count">#{dependencies.size}</span>
              </h3>
              {dependencies.map((pkg: any, i: number) => (
                <SinglePackage key={i} details={pkg} />
              ))}

              <h3>
                DevDependencies{' '}
                <span className="count">#{devDependencies.size}</span>
              </h3>
              {devDependencies.map((pkg: any, i: number) => (
                <SinglePackage key={i} details={pkg} />
              ))}
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

function mapStateToProps(state: IState) {
  return {
    results: state.results,
    project: state.project,
  };
}

export default connect(mapStateToProps, null)(ResultsPage);
