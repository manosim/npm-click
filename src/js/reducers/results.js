import { Map, List} from 'immutable';

import {
  SETUP_REQUESTS,
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  FETCH_PACKAGE_FAILURE
} from '../actions';

const initialState = Map({
  isFetching: false,
  errored: false,
  response: List(),
  completed: 0,
  total: 0
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_REQUESTS:
      return state
        .set('isFetching', true)
        .set('response', List())
        .set('completed', 0)
        .set('total', action.numberOfPackages);

    case FETCH_PACKAGE_REQUEST:
      return state
        .set('errored', false);

    case FETCH_PACKAGE_SUCCESS:
      let isDone1 = state.get('completed') + 1 === state.get('total');
      return state
        .set('completed', state.get('completed') + 1)
        .set('isFetching', isDone1 ? false : true)
        .set('errored', false);

    case FETCH_PACKAGE_FAILURE:
      let isDone2 = state.get('completed') + 1 === state.get('total');
      return state
        .set('completed', state.get('completed') + 1)
        .set('isFetching', isDone2 ? false : true)
        .set('errored', true);

    default:
      return state;
  }
};
