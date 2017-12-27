import { Map, List } from 'immutable';
import * as semver from 'semver';

import { FETCH_PACKAGES, SET_FILE_ERROR } from '../../ts/actions';

const initialState = Map({
  isFetching: false,
  errored: false,
  packages: List(),
  response: List(),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILE_ERROR:
      return initialState;
    case FETCH_PACKAGES.REQUEST:
      return initialState
        .set('isFetching', true)
        .set('packages', action.packages);

    case FETCH_PACKAGES.SUCCESS:
      const data = action.payload.map(obj => {
        const packageName = obj.hasIn(['data', 'name'])
          ? obj.getIn(['data', 'name'])
          : decodeURIComponent(
              obj
                .getIn(['config', 'url'])
                .replace(obj.getIn(['config', 'baseURL']), '')
            );

        const requiredDetails = state.get('packages').find(
          item => {
            return item.get('name') === packageName;
          },
          null,
          Map()
        );

        const requiredVersion = requiredDetails.get('requiredVersion', '');
        const isDependency = requiredDetails.get('isDependency', false);
        const latestVersion = obj.getIn(['data', 'dist-tags', 'latest']);
        const isSatisfied = latestVersion
          ? semver.satisfies(latestVersion, requiredVersion)
          : false;

        return Map({
          name: packageName,
          payload: obj.get('data'),
          requiredVersion,
          isDependency,
          isSatisfied,
          errored:
            typeof isSatisfied === 'boolean' && latestVersion ? false : true,
        });
      });

      return state.set('isFetching', false).set('response', data);
    case FETCH_PACKAGES.FAILURE.FAILURE:
      return initialState.set('errored', true);
    default:
      return state;
  }
}
