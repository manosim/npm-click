import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <a className="navbar-brand" href="/">
          <img
            className="img-responsive"
            alt="NPM click"
            src="images/logo-big.png" />
        </a>
      </nav>
    );
  }
};
