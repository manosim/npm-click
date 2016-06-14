import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import results from './results';

export default combineReducers({
  results,
  routing: routerReducer
});
