var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

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
        <ReactBootstrap.Row className='search-bar'>
          <ReactBootstrap.Col mdOffset={3} md={6}>

            <ReactBootstrap.Input label='Search GitHub Repositories'>
              <ReactBootstrap.Row>
                <ReactBootstrap.Col sm={9}>

                  <ReactBootstrap.Input
                    type='text'
                    className='input-lg'
                    value={this.state.keywords}
                    bsStyle={this.validateInput()}
                    hasFeedback
                    onChange={this.handleChange.bind(this, 'keywords')}
                    placeholder='Enter keywords' />

                </ReactBootstrap.Col>
                <ReactBootstrap.Col sm={3}>

                  <ReactBootstrap.Button
                    className='btn-block btn-lg'
                    onClick={this.goSearch}>
                      Search
                  </ReactBootstrap.Button>

                </ReactBootstrap.Col>
              </ReactBootstrap.Row>
            </ReactBootstrap.Input>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
      </div>
    );
  }
});

module.exports = Search;