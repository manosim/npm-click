import { Map } from 'immutable';

import {
  FETCH_PACKAGES,
  SET_FILE_ERROR,
  SETUP_REQUESTS,
} from '../../ts/actions';

const initialState = Map({
  name: null,
  version: null,
  error: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PACKAGES.REQUEST:
      return initialState
        .set('name', action.projectDetails.get('name'))
        .set('version', action.projectDetails.get('version'));
    case SET_FILE_ERROR:
      return state.set('error', action.error);
    case SETUP_REQUESTS:
      return state
        .set('name', action.projectName)
        .set('version', action.version)
        .set('error', null);

    default:
      return state;
  }
}
