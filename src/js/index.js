import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import Navigation from '../ts/components/navigation';
import HomePage from '../ts/pages/home';
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
}

class NotFound extends React.Component {
  render() {
    return <h2>Not found</h2>;
  }
}

// Store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/results" exact component={ResultsPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
