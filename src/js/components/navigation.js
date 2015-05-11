var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var CollapsibleNav = ReactBootstrap.CollapsibleNav;

var Navigation = React.createClass({
  render: function () {
    return (

      <Navbar brand={<a href="/">Npm Click</a>} inverse>
          <Nav right>
            <NavItem href='https://github.com/ekonstantinidis/npm-click'>Fork me on <i className='fa fa-github' /></NavItem>
          </Nav>
      </Navbar>

    );
  }
});

module.exports = Navigation;