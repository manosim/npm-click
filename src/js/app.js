import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import Navigation from './components/navigation';
import SearchPage from './pages/search';
import ResultsPage from './pages/results';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
};

class NotFound extends React.Component {
  render() {
    return <h2>Not found</h2>;
  }
};

// Store
const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SearchPage} />
          <Route path="/" component={SearchPage} />
          <Route path="/results" component={ResultsPage} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('app')
);
