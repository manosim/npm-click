var React = require('react');

var About = require('../components/about');
var Search = require('../components/search');

var SearchPage = React.createClass({

  render: function () {
    return (
      <div>
        <Search />
        <About />
      </div>
    );
  }
});

module.exports = SearchPage;
