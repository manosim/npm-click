import * as React from 'react';

export default class Navigation extends React.Component {
  render() {
    console.log('ASDSADADAD');
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <a className="navbar-brand" href="/">
          <img
            className="img-responsive"
            alt="NPM click"
            src="src/images/logo-big.png"
          />
        </a>
      </nav>
    );
  }
}
