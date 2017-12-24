import * as React from 'react';
import { connect } from 'react-redux';

import Search from '../components/search';
import AboutTop from '../components/about-top';
import AboutBottom from '../components/about-bottom';

interface IProps {
  hasResults: boolean;
}

export class HomePage extends React.Component<IProps, {}> {
  render() {
    const { hasResults } = this.props;
    return (
      <div>
        <AboutTop />
        <Search />
        {!hasResults && <AboutBottom />}
      </div>
    );
  }
}

interface IState {
  results: any;
}

export function mapStateToProps(state: IState) {
  return {
    hasResults: !state.results.get('response').isEmpty(),
  };
}

export default connect(mapStateToProps, null)(HomePage);
