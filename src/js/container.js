import * as React from 'react';
import { connect } from 'react-redux';

import Navbar from './components/navigation';
import HomePage from './sections/home';
import ResultsPage from './sections/results';

class Container extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <HomePage />

        {!this.props.results.get('response').isEmpty() && <ResultsPage />}
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

export default connect(mapStateToProps, null)(Container);
