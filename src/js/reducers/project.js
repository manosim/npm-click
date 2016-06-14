import { Map } from 'immutable';

import {
  SETUP_REQUESTS
} from '../actions';

const initialState = Map({
  name: null,
  version: null
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_REQUESTS:
      return state
        .set('name', action.projectName)
        .set('version', action.version);

    default:
      return state;
  }
};
