import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../../js/reducers';

export default function configureStore(initialState = undefined) {
  const middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const loggerMiddleware = createLogger({
      collapsed: true,
    });
    middlewares.push(loggerMiddleware);
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
