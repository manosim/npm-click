import * as React from 'react';
import { connect } from 'react-redux';

import Search from '../components/search';
import AboutTop from '../components/about-top';
import AboutBottom from '../../ts/components/about-bottom.tsx';

export class HomePage extends React.Component {
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

function mapStateToProps(state) {
  return {
    hasResults: !state.results.get('response').isEmpty(),
  };
}

export default connect(mapStateToProps, null)(HomePage);
