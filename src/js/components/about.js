var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Actions = require('../actions/actions');
var Loading = require('../components/loading');
var DependenciesStore = require('../stores/dependencies');

var Alert = ReactBootstrap.Alert;
var Input = ReactBootstrap.Input;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var About = React.createClass({

  render: function () {
    return (
      <div className='container-fluid section-welcome'>
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Comparing NPM (dev)Dependencies</h1>
              <h2>All you need is your package.json. That's all!</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <img src='images/npm-logo.png' className='img-responsive' />
              <p className='lead'>npm is the package manager for Node.js. It was created in 2009 as an open source project to help JavaScript developers easily share packaged modules of code.</p>
            </Col>
            <Col md={4}>
              <img src='images/packagejson.png' className='img-responsive' />
              <p className='lead'>npm is the package manager for Node.js. It was created in 2009 as an open source project to help JavaScript developers easily share packaged modules of code.</p>
            </Col>
            <Col md={4}>
              <img src='images/results.png' className='img-responsive' />
              <p className='lead'>npm is the package manager for Node.js. It was created in 2009 as an open source project to help JavaScript developers easily share packaged modules of code.</p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = About;
