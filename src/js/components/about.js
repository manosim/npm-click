var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

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
              <p className='lead'>NPM is awesome! We all use it. Dependencies get updated daily(?) so if you want to be up to date, you are at the right place.</p>
            </Col>
            <Col md={4}>
              <img src='images/packagejson.png' className='img-responsive' />
              <p className='lead'>Got your package.json? Drop it on the search bar, copy & paste its content to the text box or use the upload. Whatever works for you... 'Submit' and that's all!</p>
            </Col>
            <Col md={4}>
              <img src='images/results.png' className='img-responsive' />
              <p className='lead'>Still not convienced? There's a 'demo' button next to the search form. Yeap that red one. Click and see what happens! (I don't mean the loading btw)</p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = About;
