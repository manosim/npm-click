var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Actions = require('../actions/actions');
var DependenciesStore = require('../stores/dependencies-store');

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
    Actions.clearResults();

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
      for (var key in jsonValue) {

        if (key === 'dependencies' || key === 'devDependencies') {
          var dependencies = jsonValue[key];

          for (var name in dependencies) {
            Actions.getDependency(key, name, dependencies[name]);
          }
        }

      }
    } catch (error) {
      console.log(error); // Catch Errors
      this.setState({
        errors: true
      });
    }

  },

  gotDependenciesErrors: function () {
    console.log("ERROR...");
  },

  render: function () {
    return (
      <div className='container-fluid'>
        <Row className='search-bar'>
          <Col mdOffset={3} md={6}>

            <Input
              type='textarea'
              className='input-lg'
              bsStyle={this.validateInput()}
              hasFeedback
              rows="15"
              label='Your package.json'
              placeholder='Enter dependencies'
              onChange={this.handleJsonChange} />

          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = DependenciesField;
