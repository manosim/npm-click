var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var DependenciesField = React.createClass({
  getInitialState: function () {
    return {
      dependencies: '',
      errors: false,
    };
  },

  validateInput: function () {
    if (this.state.errors) {
      return 'error';
    }
  },

  handleChange: function (key, event) {
    var state = {};
    state[key] = event.target.value;
    state.errors = undefined;
    this.setState(state);
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
                    rows="5"
                    label='Your package.json'
                    placeholder='Enter dependencies'
                    onChange={this.handleChange.bind(this, 'dependencies')} />

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
