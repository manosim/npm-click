import * as React from 'react';

import AboutBottom from '../../js/components/about-bottom';
import AboutTop from '../../js/components/about-top';
import Search from '../../js/components/search';

interface Props {}

export default class HomePage extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <AboutTop />
        <Search />
        <AboutBottom />
      </div>
    );
  }
}
