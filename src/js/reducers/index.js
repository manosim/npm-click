import { combineReducers } from 'redux';

import project from './project';
import results from './results';

export default combineReducers({
  project,
  results,
});
