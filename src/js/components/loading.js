var React = require('react');

var loadingStyle = {
    textAlign: 'center',
    padding: '5px 0 15px'
};

var Loading = React.createClass({

  getInitialState: function () {
    return {
      show: this.props.shouldShow
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.replaceState({
      show: newProps.shouldShow
    });
  },

  render: function () {
    var loading;
    if (!this.state.show) {
      loadingStyle.display = 'none';
    } else {
      loadingStyle.display = 'block';
    }
    return (
      <div style={loadingStyle}>
        <i className='fa fa-refresh fa-spin'></i>
      </div>
    );
  }
});

module.exports = Loading;
