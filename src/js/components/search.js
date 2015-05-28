var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Dropzone = require('react-dropzone');
var Loading = require('reloading');

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
      json: undefined,
      errors: undefined,
      loading: false
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
        errors: false,
        loading: false
      });
      return;
    }

    try {
      var jsonValue = JSON.parse(value);
      this.setState({
        errors: false,
        json: jsonValue
      });
    } catch (error) {
      this.gotDependenciesErrors();
    }

  },

  generateDemoData: function () {
    this.setState({
      errors: false,
      loading: true
    });

    Actions.getDependencies({
      "name": "npm-click",
      "version": "0.1.1",
      "description": "Comparing NPM (dev)Dependencies",
      "repository": {
        "type": "git",
        "url": "https://github.com/ekonstantinidis/npm-click.git"
      },

      "dependencies": {
        "@ekonstantinidis/reloading": "^0.0.6",
        "bootstrap": "^3.3.4",
        "browserify": "^9.0.8",
        "chart.js": "^1.0.2",
        "font-awesome": "^4.3.0",
        "grunt-gh-pages": "^0.10.0",
        "react": "^0.13.2",
        "react-bootstrap": "^0.21.2",
        "react-chartjs": "^0.6.0",
        "react-dropzone": "^1.0.1",
        "react-router": "^0.13.3",
        "react-tools": "^0.13.2",
        "reactify": "^1.1.0",
        "reflux": "^0.2.7",
        "reloading": "0.0.6",
        "superagent": "^1.2.0",
        "underscore": "^1.8.3",
        "watchify": "^3.1.2"
      },

      "devDependencies": {
        "@ekonstantinidis/gitify": "^0.0.1",
        "grunt": "^0.4.5",
        "grunt-contrib-clean": "^0.6.0",
        "grunt-contrib-copy": "^0.8.0",
        "grunt-contrib-less": "^1.0.1",
        "grunt-contrib-watch": "^0.6.1",
        "jshint-stylish": "^1.0.1",
        "jsxhint": "=0.14.0",
        "less": "=2.5.0"
      }
    });
  },

  gotDependenciesSuccess: function () {
    this.setState({
      loading: false
    });
    this.context.router.transitionTo('results');
  },

  gotDependenciesErrors: function () {
    this.setState({
      errors: true,
      loading: false
    });
  },

  onDrop: function (files) {
    var self = this;
    if (files.length == 1 && files[0].type == 'application/json') {
      var reader = new FileReader();

      reader.onload = function(e) {

        try {
          self.setState({
            errors: false,
            loading: true
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

  submitJson: function () {
    if (this.state.json) {
      this.setState({
        loading: true,
      });
      Actions.getDependencies(this.state.json);
    } else {
      this.gotDependenciesErrors();
    }
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

              <Dropzone onDrop={this.onDrop} className='dropzone'>
                <Input
                  type='textarea'
                  className='input-lg'
                  bsStyle={this.validateInput()}
                  hasFeedback
                  rows='8'
                  placeholder='Place the content of your package.json and I will handle the work.'
                  onChange={this.handleJsonChange}
                  onClick={this.onTextAreaClick} />

                <div className='message'>Drop your <strong>awesome</strong> package.json here</div>
                <Button bsStyle='info'>Upload package.json</Button>
              </Dropzone>

              {errors}
              <Loading shouldShow={this.state.loading} className='loading'><i className='fa fa-refresh fa-spin'></i> Getting your (dev) dependencies</Loading>

              <Row>
                <Col md={6}><Button bsStyle='success' bsSize='large' block onClick={this.submitJson}>Submit</Button></Col>
                <Col md={6}><Button bsStyle='danger' bsSize='large' block onClick={this.generateDemoData}>or do the demo?</Button></Col>
              </Row>

            </Col>
          </Row>
        </div>

      </div>
    );
  }
});

module.exports = DependenciesField;
