var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Search = React.createClass({
  getInitialState: function () {
    return {
      "keywords": ''
    };
  },

  render: function () {
    return (
      <div className='container-fluid'>
        <ReactBootstrap.Row className='search-bar'>
          <ReactBootstrap.Col mdOffset={3} md={6}>

            <ReactBootstrap.Input>
              <ReactBootstrap.Row>
                <ReactBootstrap.Col xs={9}>

                  <ReactBootstrap.Input
                    type='text'
                    className='input-lg'
                    value={this.state.keywords}
                    placeholder='Enter keywords' />

                </ReactBootstrap.Col>
                <ReactBootstrap.Col xs={3}>

                  <ReactBootstrap.Button className='btn-block btn-lg'>Search</ReactBootstrap.Button>

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