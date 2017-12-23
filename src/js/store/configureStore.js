import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // const createLogger = require('redux-logger');
  // const loggerMiddleware = createLogger();
  // middlewares.push(loggerMiddleware);
}

export default function configureStore(initialState) {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );

  return createStoreWithMiddleware(rootReducer, initialState);
}
