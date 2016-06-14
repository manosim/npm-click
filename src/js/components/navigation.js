import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <a href="/">
          <img
            className="navbar-brand img-responsive"
            alt="NPM click"
            src="dist/images/logo.png" />
        </a>
      </nav>
    );
  }
};
