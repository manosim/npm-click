var React = require('react');
var ReactBootstrap  = require('react-bootstrap');

var Navigation = React.createClass({
  render: function () {
    return (

      <ReactBootstrap.Navbar brand='Git Compare' inverse toggleNavKey={0}>
        <ReactBootstrap.CollapsableNav eventKey={0}> {/* This is the eventKey referenced */}
          <ReactBootstrap.Nav navbar right>
            <ReactBootstrap.NavItem eventKey={1} href='#'>Fork me on <i className='fa fa-github' /></ReactBootstrap.NavItem>
          </ReactBootstrap.Nav>
        </ReactBootstrap.CollapsableNav>
      </ReactBootstrap.Navbar>

    );
  }
});

module.exports = Navigation;