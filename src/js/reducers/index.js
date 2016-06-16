import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import project from './project';
import results from './results';

export default combineReducers({
  project,
  results,
  routing: routerReducer
});
