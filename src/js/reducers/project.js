import { Map } from 'immutable';

import {
  READ_FILE_ERROR,
  SETUP_REQUESTS
} from '../actions';

const initialState = Map({
  name: null,
  version: null,
  error: null
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case READ_FILE_ERROR:
      return state
        .set('error', action.error);
    case SETUP_REQUESTS:
      return state
        .set('name', action.projectName)
        .set('version', action.version)
        .set('error', null);

    default:
      return state;
  }
};
