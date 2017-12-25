import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Navbar from './components/navigation';
import HomePage from './sections/home';
import ResultsPage from './sections/results';

interface IProps {
  isLoading: boolean;
  results: any;
}

class Container extends React.Component<IProps, {}> {
  results: any;

  componentWillReceiveProps(nextProps: IProps) {
    if (!this.props.isLoading && nextProps.isLoading) {
      setTimeout(() => {
        const elem: any = ReactDOM.findDOMNode(this.results);
        return elem && window.scrollTo(0, elem.offsetTop);
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <HomePage />

        {!this.props.results.get('response').isEmpty() && (
          <ResultsPage ref={el => (this.results = el)} />
        )}
      </div>
    );
  }
}

interface IState {
  results: any;
}

function mapStateToProps(state: IState) {
  return {
    isLoading: state.results.get('isFetching'),
    results: state.results,
  };
}

export default connect(mapStateToProps, null)(Container);
