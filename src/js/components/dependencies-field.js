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

    try {
        var jsonValue = JSON.parse(e.target.value);

        for (var key in jsonValue) {

          if (key === 'dependencies' || key === 'devDependencies') {
            Actions.getDependency({
              key: jsonValue[key]
            });
          }

        }

    } catch (e) {
        console.log(e); // Catch Errors
        this.setState({
          errors: true
        })
        return;
    }

  },

  gotDependenciesErrors: function () {
    console.log("ERROR...");
  },

  goSearch: function (e) {
    e.preventDefault();
    var dependencies = this.state.dependencies;

    if (!dependencies) {
      this.setState({
        "errors": true
      });
      return;
    }

  },

  render: function () {
    return (
      <div className='container-fluid'>
        <Row className='search-bar'>
          <Col mdOffset={3} md={6}>
          <form onSubmit={this.goSearch}>
              <Row>
                <Col xs={12}>

                  <Input
                    type='textarea'
                    className='input-lg'
                    bsStyle={this.validateInput()}
                    hasFeedback
                    rows="100"
                    label='Your package.json'
                    placeholder='Enter dependencies'
                    onChange={this.handleJsonChange} />

                </Col>
                <Col xs={12}>

                  <Input
                    type='submit'
                    value='Search'
                    className='btn-block btn-lg' />

                </Col>
              </Row>

          </form>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = DependenciesField;
