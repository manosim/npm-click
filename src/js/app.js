var React = require('react');
var Router = require('react-router');
var ReactBootstrap = require('react-bootstrap');

var Navigation = require('./components/navigation');
var Search = require('./components/search');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation />
        <Search />
        <RouteHandler />
      </div>
    );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <h1>Home Page!</h1>
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
