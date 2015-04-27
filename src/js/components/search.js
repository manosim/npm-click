var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var apiRequests = require('../utils/api-requests');
var Actions = require('../actions/actions');

var Search = React.createClass({
  getInitialState: function () {
    return {
      keywords: '',
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

  goSearch: function () {
    var keywords = this.state.keywords;

    if (!keywords) {
      this.setState({
        "errors": true
      });
      return;
    }

    Actions.makeSearch(keywords);
  },

  render: function () {
    return (
      <div className='container-fluid'>
        <Row className='search-bar'>
          <Col mdOffset={3} md={6}>

            <Input label='Search GitHub Repositories'>
              <Row>
                <Col sm={9}>

                  <Input
                    type='text'
                    className='input-lg'
                    value={this.state.keywords}
                    bsStyle={this.validateInput()}
                    hasFeedback
                    onChange={this.handleChange.bind(this, 'keywords')}
                    placeholder='Enter keywords' />

                </Col>
                <Col sm={3}>

                  <Button
                    className='btn-block btn-lg'
                    onClick={this.goSearch}>
                      Search
                  </Button>

                </Col>
              </Row>
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Search;