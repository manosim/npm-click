import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <img
          className={'navbar-brand img-responsive'}
          alt="NPM click"
          src="dist/images/logo.png"
          onClick={this.openBrowser} />
      </nav>
    );
  }
};
