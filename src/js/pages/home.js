import React from 'react';

import Search from '../components/search';
import AboutTop from '../components/about-top';
import AboutBottom from '../components/about-bottom';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <AboutTop />
        <Search />
        <AboutBottom />
      </div>
    );
  }
};
