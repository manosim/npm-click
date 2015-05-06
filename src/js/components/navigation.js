var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var CollapsibleNav = ReactBootstrap.CollapsibleNav;

var Navigation = React.createClass({
  render: function () {
    return (

      <Navbar brand='Npm Check' inverse toggleNavKey={0}>
        <CollapsibleNav eventKey={0}> {/* This is the eventKey referenced */}
          <Nav navbar right>
            <NavItem eventKey={1} href='https://github.com/ekonstantinidis/npm-check'>Fork me on <i className='fa fa-github' /></NavItem>
          </Nav>
        </CollapsibleNav>
      </Navbar>

    );
  }
});

module.exports = Navigation;