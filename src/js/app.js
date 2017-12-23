import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import configureStore from './store/configureStore';
import Navigation from './components/navigation';
import HomePage from './pages/home';
import ResultsPage from './pages/results';

class NotFound extends React.Component {
  render() {
    return <h2>Not found</h2>;
  }
}

// Store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navigation />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/results" component={ResultsPage} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('app')
);
