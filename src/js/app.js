var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var Navigation = require('./components/navigation');
var Search = require('./components/search');
var Results = require('./components/results');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
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
    <DefaultRoute handler={Search}/>
    <Route name="search" path="/" handler={Search}/>
    <Route name="results" path="results" handler={Results}/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});