var React = require('react');
var ReactBootstrap  = require('react-bootstrap');

var Navigation = React.createClass({
  render: function () {
    return (

      <ReactBootstrap.Navbar brand='Git Compare' inverse toggleNavKey={0}>
        <ReactBootstrap.CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
          <ReactBootstrap.Nav navbar>
            <ReactBootstrap.NavItem eventKey={1} href='#'>Link</ReactBootstrap.NavItem>
            <ReactBootstrap.NavItem eventKey={2} href='#'>Link</ReactBootstrap.NavItem>
            <ReactBootstrap.DropdownButton eventKey={3} title='Dropdown'>
              <ReactBootstrap.MenuItem eventKey='1'>Action</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem eventKey='2'>Another action</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem eventKey='3'>Something else here</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem divider />
              <ReactBootstrap.MenuItem eventKey='4'>Separated link</ReactBootstrap.MenuItem>
            </ReactBootstrap.DropdownButton>
          </ReactBootstrap.Nav>
          <ReactBootstrap.Nav navbar right>
            <ReactBootstrap.NavItem eventKey={1} href='#'>Link Right</ReactBootstrap.NavItem>
            <ReactBootstrap.NavItem eventKey={2} href='#'>Link Right</ReactBootstrap.NavItem>
          </ReactBootstrap.Nav>
        </ReactBootstrap.CollapsableNav>
      </ReactBootstrap.Navbar>

    );
  }
});

module.exports = Navigation;