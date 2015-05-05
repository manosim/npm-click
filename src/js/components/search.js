var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Dropzone = require('react-dropzone');

var Actions = require('../actions/actions');
var DependenciesStore = require('../stores/dependencies');

var Alert = ReactBootstrap.Alert;
var Input = ReactBootstrap.Input;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var DependenciesField = React.createClass({
  mixins: [
    Reflux.connect(DependenciesStore, 'dependencies'),
    Reflux.listenTo(Actions.getDependencies.completed, 'gotDependenciesSuccess'),
    Reflux.listenTo(Actions.onGetDependenciesErrors, 'gotDependenciesErrors')
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      dependencies: undefined,
      errors: undefined
    };
  },

  validateInput: function () {
    if (this.state.errors) {
      return 'error';
    }
  },

  handleJsonChange: function (e) {

    var value = e.target.value;

    if (!value) {
      this.setState({
        errors: false
      });
      return;
    }

    try {
      this.setState({
        errors: false
      });

      var jsonValue = JSON.parse(value);
      Actions.getDependencies(jsonValue);

    } catch (error) {
      this.gotDependenciesErrors();
    }

  },

  generateDemoData: function () {
    this.setState({
      errors: false
    });

    Actions.getDependencies({
      "name": "dep-compare",
      "version": "0.1.1",
      "description": "Comparing NPM (dev)Dependencies",
      "repository": {
        "type": "git",
        "url": "https://github.com/ekonstantinidis/git-compare.git"
      },

      "dependencies": {
        "bootstrap":"^3.3.4",
        "browserify":"^9.0.8",
        "font-awesome":"^4.3.0",
        "react":"^0.13.2",
        "react-bootstrap":"^0.21.0",
        "react-tools":"^0.13.2",
        "reactify":"^1.1.0",
        "reflux":"^0.1.7",
        "superagent":"^1.2.0",
        "watchify":"^3.1.2",
        "request":"2.42.0"
      },

      "devDependencies": {
        "grunt":"^0.4.5",
        "grunt-contrib-clean":"^0.5.0",
        "grunt-contrib-copy":"^0.8.0",
        "grunt-contrib-less":"^1.0.1",
        "grunt-contrib-watch":"^0.6.1",
        "jshint-stylish":"^0.9.1",
        "jsxhint":"=0.14.0",
        "less":"=2.5.0"
      }
    });
  },

  gotDependenciesSuccess: function () {
    this.context.router.transitionTo('results');
  },

  gotDependenciesErrors: function () {
    this.setState({
      errors: true
    });
  },

  onDrop: function (files) {
    var self = this;
    if (files.length == 1 && files[0].type == 'application/json') {
      var reader = new FileReader();

      reader.onload = function(e) {

        try {
          self.setState({
            errors: false
          });

          var jsonValue = JSON.parse(reader.result);
          Actions.getDependencies(jsonValue);

        } catch (error) {
          self.gotDependenciesErrors();
        }

      };

      reader.readAsText(files[0]);
    } else {
      this.setState({
        errors: true
      });
    }
  },

  onTextAreaClick: function (event) {
    event.stopPropagation();
  },

  render: function () {
    var errors;
    if (this.state.errors) {
        errors = (
          <div className='container-fluid error-bar'>
            <Alert bsStyle='danger'>Oops! Something is wrong with your package.json. Please try again.</Alert>
          </div>
        );
    }
    return (
      <div>
        <div className='container-fluid'>
          <Row className='search-bar'>
            <Col mdOffset={3} md={6}>

              <Dropzone onDrop={this.onDrop} className='dropzone hidden-xs'>
                <Input
                  type='textarea'
                  className='input-lg'
                  bsStyle={this.validateInput()}
                  hasFeedback
                  rows='10'
                  placeholder='Paste your package.json and I will handle the work.'
                  onChange={this.handleJsonChange}
                  onClick={this.onTextAreaClick} />

                <div className='message'>Drop your <strong>awesome</strong> package.json here</div>
                <Button bsStyle='info'>Upload package.json</Button>
              </Dropzone>

              {errors}

              <Row>
                <Col md={6}><Button bsStyle='success' bsSize='large' block>Submit</Button></Col>
                <Col md={6}><Button bsStyle='danger' bsSize='large' block onClick={this.generateDemoData}>or do the demo?</Button></Col>
              </Row>

            </Col>
          </Row>
        </div>

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

      </div>
    );
  }
});

module.exports = DependenciesField;
