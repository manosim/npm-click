import React from 'react';

var ReactBootstrap = require('react-bootstrap');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var CollapsibleNav = ReactBootstrap.CollapsibleNav;

var Navigation = React.createClass({
  render: function () {
    return (

      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Npm Click</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
          <NavItem href='https://github.com/ekonstantinidis/npm-click'>Fork me on <i className='fa fa-github' /></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
});

module.exports = Navigation;
