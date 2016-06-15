import React from 'react';
import { connect } from 'react-redux';
// import { Pie } from 'react-chartjs';

import Package from '../components/package';

export default class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectDetails: 'ProjectStore.getProjectDetails()',
      packages: 'DependenciesStore.getResults()',
      errors: false,
      chartOptions: {
        percentageInnerCutout : 35,
        segmentShowStroke : false,
        responsive: true
      }
    };
  }

  componentWillMount() {
    // console.log('YEYEYEYYEYE');
    // var projectName = ProjectStore.getProjectDetails().name;
    // if (!projectName) {
    //   this.history.push('/');
    // }
  }

  getStat(type, label) {
    // if (this.state.packages.stats[type]) {
    //   for (var i = this.state.packages.stats[type].length - 1; i >= 0; i--) {
    //     if (this.state.packages.stats[type][i].label === label) {
    //       return this.state.packages.stats[type][i].value;
    //     }
    //   }
    // }
    return '-';
  }

  render() {
    const dependencies = this.props.results.get('response').filter((obj) => obj.isDependency === true);
    const devDependencies = this.props.results.get('response').filter((obj) => obj.isDependency === false);

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
                  Up to date: {this.getStat('dependencies', 'Up to date')}
                </div>
                <div className="minor-updates">
                  Minor Updates: {this.getStat('dependencies', 'Minor Update')}
                </div>
                <div className="major-updates">
                  Major Updates: {this.getStat('dependencies', 'Major Update')}
                </div>
              </div>
              <div className="col-sm-2">
                {/*<Pie
                  data={this.state.packages.stats.dependencies}
                  options={this.state.chartOptions} redraw />*/}
              </div>
              <div className="col-sm-2 stats-map">
                <small>devDependencies</small>
                <div className="uptodate">
                  Up to date: {this.getStat('devDependencies', 'Up to date')}
                </div>
                <div className="minor-updates">
                  Minor Updates: {this.getStat('devDependencies', 'Minor Update')}
                </div>
                <div className="major-updates">
                  Major Updates: {this.getStat('devDependencies', 'Major Update')}
                </div>
              </div>
              <div className="col-sm-2">
                {/*<PieChart
                  data={this.state.packages.stats.devDependencies}
                  options={this.state.chartOptions} redraw />*/}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>
                Dependencies
                <span className="count">({dependencies.size})</span>
              </h2>
              {dependencies.map((pkg, i) => <Package key={i} details={pkg} />)}
            </div>

            <div className="col-md-6">
              <h2>
                DevDependencies
                <span className="count">({devDependencies.size})</span>
              </h2>
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
