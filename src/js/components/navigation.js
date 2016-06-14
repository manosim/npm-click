import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-inverse">
        <a href="/">Npm Click</a>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a href="https://github.com/ekonstantinidis/npm-click">Fork me on <i className="fa fa-github" /></a>
          </li>
        </ul>
      </nav>
    );
  }
};
