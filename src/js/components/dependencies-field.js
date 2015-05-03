var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Dropzone = require('react-dropzone');

var Actions = require('../actions/actions');
var DependenciesStore = require('../stores/dependencies-store');

var Alert = ReactBootstrap.Alert;
var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var DependenciesField = React.createClass({
  mixins: [
    Reflux.connect(DependenciesStore, 'dependencies'),
    Reflux.listenTo(Actions.onGetDependenciesErrors, 'gotDependenciesErrors')
  ],

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
      Actions.getDependency(jsonValue);

    } catch (error) {
      this.gotDependenciesErrors();
    }

  },

  generateDemoData: function () {
    Actions.getDependency({
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
        "reflux":"^0.2.7",
        "superagent":"^1.2.0",
        "watchify":"^3.1.2",
        "request":"2.42.0"
      },

      "devDependencies": {
        "grunt":"^0.4.5",
        "grunt-contrib-clean":"^0.6.0",
        "grunt-contrib-copy":"^0.8.0",
        "grunt-contrib-less":"^1.0.1",
        "grunt-contrib-watch":"^0.6.1",
        "jshint-stylish":"^1.0.1",
        "jsxhint":"=0.14.0",
        "less":"=2.5.0"
      }
    });
  },

  gotDependenciesErrors: function () {
    console.log('ERROR...');
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
          Actions.getDependency(jsonValue);

        } catch (error) {
          self.gotDependenciesErrors();
        }

      };

      reader.readAsText(files[0]);
    }
  },

  render: function () {
    var errors;
    if (this.state.errors) {
        errors = (
          <Col mdOffset={2} md={8}>
            <Alert bsStyle='danger'>Oops! Something is wrong with your package.json. Please try again.</Alert>
          </Col>
        );
    }
    return (
      <div className='container-fluid'>
        <Row className='search-bar'>
          <Col mdOffset={2} md={5}>

            <Input
              type='textarea'
              className='input-lg'
              bsStyle={this.validateInput()}
              hasFeedback
              rows='10'
              placeholder='Your package.json'
              onChange={this.handleJsonChange} />

          </Col>

          <Col md={3}>
            <Dropzone onDrop={this.onDrop} className='dropzone'>
              <div>Drop your <strong>awesome</strong> package.json here, or click to select files to upload.</div>
            </Dropzone>

            <Button bsStyle='danger' bsSize='large' block onClick={this.generateDemoData}>or do the demo?</Button>
          </Col>

          {errors}
        </Row>
      </div>
    );
  }
});

module.exports = DependenciesField;
