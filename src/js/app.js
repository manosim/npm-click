var React = require('react');
var Router = require('react-router');
var ReactBootstrap  = require('react-bootstrap');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var App = React.createClass({
  render: function () {
    return (
      <ReactBootstrap.Grid className="app">
          <ReactBootstrap.Row className='converter hex-to-uicolor'>
            <ReactBootstrap.Col xs={12} mdOffset={3} md={6}>
              <RouteHandler />
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
      </ReactBootstrap.Grid>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <h1>Welcome!</h1>
    );
  }
});

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home}/>
    <Route name="home" path="home" handler={Home}/>
    <NotFoundRoute handler={NotFound}/>
    <Redirect from="/" to="home" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
