import * as React from 'react'; // eslint-disable-line no-unused-vars
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from '../js/store/configureStore';
import AppContainer from './container';

// Store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
