import React from 'react';

import Search from '../components/search';
import About from '../components/about';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Search />
        <About />
      </div>
    );
  }
};
